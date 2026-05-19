/**
 * Fetches GitHub repository health signals for all lessons that have a repo URL.
 * Writes a snapshot to src/data/github-health.json for use at build time.
 *
 * Usage:
 *   GITHUB_TOKEN=your_token node scripts/fetch-github-health.mjs
 *   node scripts/fetch-github-health.mjs   (unauthenticated, 60 req/hr limit)
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));
const lessonsDir = join(__dirname, '../src/content/lessons');
const outputPath = join(__dirname, '../src/data/github-health.json');

function parseGithubRepo(url) {
  if (!url || url === 'null') return null;
  try {
    const u = new URL(url);
    if (u.hostname !== 'github.com') return null;
    const parts = u.pathname.split('/').filter(Boolean);
    if (parts.length < 2) return null; // org-only URL, not a repo
    return { owner: parts[0], repo: parts[1] };
  } catch {
    return null;
  }
}

function formatDate(isoString) {
  if (!isoString) return null;
  return isoString.slice(0, 10); // YYYY-MM-DD
}

async function fetchRepoHealth(owner, repo, headers) {
  const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers });

  if (repoRes.status === 404) {
    console.warn(`    404: ${owner}/${repo} — skipping`);
    return null;
  }
  if (!repoRes.ok) {
    console.warn(`    Error ${repoRes.status}: ${owner}/${repo} — skipping`);
    return null;
  }

  const data = await repoRes.json();

  // Contributor count: get first page (up to 100), note if truncated
  const contribRes = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=100&anon=false`,
    { headers }
  );
  let contributorCount = null;
  let contributorCountTruncated = false;
  if (contribRes.ok) {
    const contribs = await contribRes.json();
    if (Array.isArray(contribs)) {
      contributorCount = contribs.length;
      contributorCountTruncated = contribs.length === 100;
    }
  }

  return {
    stars: data.stargazers_count ?? 0,
    forks: data.forks_count ?? 0,
    openIssues: data.open_issues_count ?? 0,
    pushedAt: formatDate(data.pushed_at),
    updatedAt: formatDate(data.updated_at),
    contributorCount,
    contributorCountTruncated,
    license: data.license?.spdx_id ?? null,
    archived: data.archived ?? false,
  };
}

async function main() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    console.warn('Warning: GITHUB_TOKEN not set — using unauthenticated (60 req/hr).');
  }

  const headers = {
    Accept: 'application/vnd.github.v3+json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const files = readdirSync(lessonsDir).filter((f) => f.endsWith('.yaml'));
  const results = {};
  let fetched = 0;
  let skipped = 0;

  for (const file of files) {
    const content = readFileSync(join(lessonsDir, file), 'utf8');
    const lesson = yaml.load(content);
    const parsed = parseGithubRepo(lesson.repo);

    if (!parsed) {
      console.log(`  Skip: ${lesson.name} (no valid repo URL)`);
      skipped++;
      continue;
    }

    console.log(`  Fetch: ${parsed.owner}/${parsed.repo}`);
    const health = await fetchRepoHealth(parsed.owner, parsed.repo, headers);

    if (health) {
      results[lesson.repo] = health;
      fetched++;
      console.log(
        `    stars=${health.stars} pushed=${health.pushedAt} contributors=${health.contributorCount}${health.contributorCountTruncated ? '+' : ''}`
      );
    } else {
      skipped++;
    }

    // Small delay to be polite to the API
    await new Promise((r) => setTimeout(r, 250));
  }

  const output = {
    fetchedAt: new Date().toISOString(),
    lessons: results,
  };

  writeFileSync(outputPath, JSON.stringify(output, null, 2));
  console.log(`\nDone. ${fetched} fetched, ${skipped} skipped. Written to ${outputPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
