# IMLS Open Science Curriculum Hub

This project is a comprehensive, open-source curriculum hub for librarians covering Open Science principles, data management, and reproducibility. It is funded by the Institute of Museum and Library Services (IMLS).

Registry key: `imls_open_science`. Shared repo: branch and PR.

## Project Overview

- **Purpose:** Provide 14+ peer-reviewed open science lesson plans and a central resource for librarians.
- **Primary Technologies:**
  - **Framework:** [Astro v5](https://astro.build/) (Static Site Generation).
  - **CMS:** [Keystatic](https://keystatic.com/) (Local/Cloud CMS for content editors).
  - **Styling:** SCSS with a Bootstrap-based "Agency" theme.
  - **UI Components:** Astro Components & React (primarily for Keystatic and interactive elements).
  - **Data/Content:** YAML files, Markdown (`.md`), and Markdoc (`.mdoc`).
  - **Automation:** Python and Bash scripts for citation management and bulk PR creation.

## Architecture

- `src/content/`: Contains Content Collections for `lessons` and `blog`.
  - `lessons/`: Individual YAML files for each curriculum module.
  - `blog/`: Markdown/Markdoc files for blog posts.
- `src/data/`: Global data files like `sitetext.yml` (authors, staff), `navigation.yml`, and `style.yml`.
- `src/components/`: Modular Astro components (e.g., `LessonCard.astro`, `Masthead.astro`).
- `src/layouts/`: Base layouts (`Layout.astro`, `PageLayout.astro`).
- `src/pages/`: File-based routing, including dynamic routes like `lessons/[slug].astro`.
- `public/assets/`: Static assets (images, CSS, JS).

## Building and Running

### Prerequisites
- Node.js (v18+)
- npm

### Commands
- `npm install`: Install dependencies.
- `npm run dev`: Start local development server (includes Keystatic CMS at `/keystatic`).
- `npm run build`: Build the static site for production (output in `dist/`).
- `npm run preview`: Preview the production build locally.
- `npm run astro ...`: Run Astro CLI commands.

## Development Conventions

- **Content Updates:** Prefer using the Keystatic CMS interface (`/keystatic`) in development or editing the YAML files in `src/content/lessons/` directly.
- **Authors & Linking:** Authors are managed in `src/data/sitetext.yml`. When adding an author to a lesson, the name must match the entry in `sitetext.yml` exactly for correct linking and profile display.
- **Styling:** Global styles are in `src/styles/agency.scss`. Component-specific styles should be scoped within `<style>` tags inside `.astro` files.
- **Citations:** Individual lesson citations are generated using `scripts/generate_lesson_cffs.py` and are based on the lesson metadata.
- **Automation Scripts:**
  - `scripts/create_prs.sh`: Automates submitting `CITATION.cff` updates to external lesson repositories.
  - `scripts/sort_lessons.py`: Utility for sorting lesson data.

## Key Files

- `astro.config.mjs`: Astro project configuration and integrations.
- `keystatic.config.ts`: Configuration for the Keystatic CMS fields and collections.
- `src/content/config.ts`: Definition of content collection schemas using Zod.
- `src/site_config.ts`: High-level site metadata (title, URL, logo).
- `GUIDE.md`: Detailed maintenance guide for content editors.
- `CITATION.cff`: Project-level citation information.
