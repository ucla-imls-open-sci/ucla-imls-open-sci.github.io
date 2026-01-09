import yaml
import os
import re
import datetime

def slugify(text):
    text = str(text).lower().strip()
    text = re.sub(r'\s+', '-', text)
    text = re.sub(r'[^\w\-]+', '', text)
    return re.sub(r'\-\-+', '-', text)

def generate_cff(lesson, author_db):
    cff = "cff-version: 1.2.0\n"
    cff += "message: \"If you use this lesson, please cite it as below.\"\n"
    cff += "type: dataset\n" 
    cff += f"title: \"{lesson['name']}\"\n"
    
    cff += "authors:\n"
    for author_name in lesson.get('authors', []):
        parts = author_name.split(' ')
        family = parts[-1]
        given = " ".join(parts[:-1])

        cff += f"  - family-names: {family}\n"
        cff += f"    given-names: {given}\n"

        # Lookup ORCID
        # Try exact match or fuzzy match
        clean_name = author_name.strip()
        found_author = None

        # Check primary list
        for p in author_db:
            if p['name'].strip() == clean_name:
                found_author = p
                break

        if found_author and found_author.get('orcid'):
             # Ensure ORCID is a full URL or just ID? CFF spec usually prefers URL or just ID.
             # sitetext has full URL. CFF spec allows 'orcid: https://orcid.org/...'
             orcid = found_author['orcid']
             if not orcid.startswith('http'):
                 orcid = f"https://orcid.org/{orcid}"
             cff += f"    orcid: \"{orcid}\"\n"

    # Add contributors if present (infrastructure/technical)
    if lesson.get('contributors') or lesson.get('content_contributors'):
        cff += "contributors:\n"

        # Infrastructure contributors
        for contributor_name in lesson.get('contributors', []):
            parts = contributor_name.split(' ')
            family = parts[-1]
            given = " ".join(parts[:-1])

            cff += f"  - family-names: {family}\n"
            cff += f"    given-names: {given}\n"
            cff += f"    type: person\n"
            cff += f"    role: infrastructure\n"

            # Lookup ORCID for contributors too
            clean_name = contributor_name.strip()
            found_contributor = None

            for p in author_db:
                if p['name'].strip() == clean_name:
                    found_contributor = p
                    break

            if found_contributor and found_contributor.get('orcid'):
                orcid = found_contributor['orcid']
                if not orcid.startswith('http'):
                    orcid = f"https://orcid.org/{orcid}"
                cff += f"    orcid: \"{orcid}\"\n"

        # Content contributors
        for contributor_name in lesson.get('content_contributors', []):
            parts = contributor_name.split(' ')
            family = parts[-1]
            given = " ".join(parts[:-1])

            cff += f"  - family-names: {family}\n"
            cff += f"    given-names: {given}\n"
            cff += f"    type: person\n"
            cff += f"    role: contributor\n"

            # Lookup ORCID
            clean_name = contributor_name.strip()
            found_contributor = None

            for p in author_db:
                if p['name'].strip() == clean_name:
                    found_contributor = p
                    break

            if found_contributor and found_contributor.get('orcid'):
                orcid = found_contributor['orcid']
                if not orcid.startswith('http'):
                    orcid = f"https://orcid.org/{orcid}"
                cff += f"    orcid: \"{orcid}\"\n"
    
    if lesson.get('abstract'):
        cff += f"abstract: \"{lesson['abstract']}\"\n"
    
    if lesson.get('keywords'):
        cff += "keywords:\n"
        for kw in lesson['keywords']:
            cff += f"  - {kw}\n"
            
    cff += "license: CC-BY-4.0\n"
    cff += f"version: {lesson.get('version', '1.0.0')}\n"
    cff += f"date-released: {datetime.date.today().isoformat()}\n"
    
    if lesson.get('doi'):
        cff += "identifiers:\n"
        cff += "  - type: doi\n"
        cff += f"    value: {lesson['doi']}\n"
        cff += "    description: \"The Zenodo DOI for the lesson.\"\n"

    if lesson.get('repo'):
        cff += f"repository-code: \"{lesson['repo']}\"\n"
        
    if lesson.get('url'):
        cff += f"url: \"{lesson['url']}\"\n"

    return cff

def main():
    with open('src/data/lessons.yml', 'r') as f:
        data = yaml.safe_load(f)
        
    # Load Author Database
    with open('src/data/sitetext.yml', 'r') as f:
        site_data = yaml.safe_load(f)
        # Assuming structure: en -> authors -> people
        # Need to handle the complex YAML structure of sitetext.yml
        # It has anchors and locale keys. Let's try to grab 'en' or the first key that has authors.
        # Based on previous reads, it has 'en' key.
        author_db = []
        if 'en' in site_data and 'authors' in site_data['en'] and 'people' in site_data['en']['authors']:
             author_db = site_data['en']['authors']['people']

    os.makedirs('generated_citations', exist_ok=True)
    abs_path = os.path.abspath('generated_citations')
    
    # Open the shell script for writing
    with open('scripts/create_prs.sh', 'w') as sh:
        sh.write("#!/bin/bash\n")
        sh.write("# Auto-generated script to create CFF PRs\n\n")
        sh.write("mkdir -p _temp_repos\n")
        sh.write("cd _temp_repos\n\n")
        
        for lesson in data['lessons']:
            if lesson.get('type') == 'external' or not lesson.get('repo'):
                continue
                
            cff_content = generate_cff(lesson, author_db)
            cff_filename = f"CITATION-{slugify(lesson['name'])}.cff"
            cff_full_path = os.path.join(abs_path, cff_filename)
            
            # Write CFF file
            with open(cff_full_path, 'w') as f:
                f.write(cff_content)
            
            repo_url = lesson['repo']
            repo_name = repo_url.split('/')[-1]
            
            # Write shell commands
            sh.write(f"echo 'Processing {repo_name}...\n")
            # Fork and clone (gh handles auth and forking logic automatically)
            sh.write(f"gh repo fork {repo_url} --clone --default-branch-only\n")
            
            sh.write(f"cd {repo_name} || exit\n") 
            sh.write("git checkout -b add-citation-cff\n")
            sh.write(f"cp '{cff_full_path}' CITATION.cff\n")
            sh.write("git add CITATION.cff\n")
            sh.write("git commit -m 'Docs: Add CITATION.cff file'\n")
            sh.write(f"git push -f -u origin add-citation-cff\n")
            sh.write(f"gh pr create --title 'Docs: Add CITATION.cff' --body 'This PR adds a CITATION.cff file to make the lesson citable, generated from the IMLS Open Science project metadata.' --repo {repo_url}\n")
            
            sh.write("cd ..\n")
            sh.write(f"rm -rf {repo_name}\n")
            sh.write("echo '--------------------------------'\n\n")

    print("Generated CFF files and scripts/create_prs.sh")

if __name__ == "__main__":
    main()
