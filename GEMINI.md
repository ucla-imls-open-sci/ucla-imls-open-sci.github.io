# UCLA IMLS Open Science Project Context (`GEMINI.md`)

**Last Updated:** January 9, 2026
**Status:** Active Development (UX Phase 2 Complete)

## 1. Project Overview
This repository hosts the **UCLA IMLS Open Science for Librarians** curriculum hub. It serves as a catalog of open educational resources (OER) designed to teach librarians technical skills and open science principles.

**Primary Goal:** Recruit instructors to "Pilot" (beta test) these lessons in their own institutions.

## 2. Technical Architecture

### Stack
*   **Framework:** [Astro v5](https://astro.build) (Static Site Generation)
*   **Styling:** SCSS + Bootstrap 4 (Legacy integration) + Custom CSS Variables
*   **Data Source:** YAML files in `src/data/` (Single Source of Truth)
*   **Deployment:** GitHub Pages (via GitHub Actions)

### Core Data Structure (`src/data/`)
*   `lessons.yml`: The database of all 15+ lessons. Controls metadata, authors, status (Alpha/Beta), and pilot history.
*   `sitetext.yml`: Internationalization (i18n) strings and author profiles.
*   `navigation.yml`: Global navigation structure.

## 3. Key Features & Implementations

### A. Pilot Recruitment Funnel
*   **Strategy:** GitHub-centric workflow. We do not use web forms.
*   **Components:**
    *   `src/pages/pilot.astro`: Dedicated landing page with benefits, FAQs, and filtered lesson lists.
    *   `PilotBanner.astro`: Homepage banner that dynamically counts lessons seeking pilots.
    *   `LessonStatusBanner.astro`: Context-aware banner on lesson pages (e.g., "Ready for External Piloting").
*   **Conversion Point:** Users are directed to a pre-filled **GitHub Issue Template** (`.github/ISSUE_TEMPLATE/pilot-interest.yml`).

### B. UCLA Dark Mode
*   **Implementation:** Custom CSS Variable engine in `src/styles/_sass/base/_dark-mode.scss`.
*   **Palette:**
    *   Background: UCLA Darkest Blue (`#003B5C`)
    *   Accents: UCLA Gold (`#FFD100`)
*   **Features:**
    *   Persistent toggle in Navbar (saved to `localStorage`).
    *   FOUC (Flash of Unstyled Content) prevention script in `Layout.astro`.
    *   Comprehensive overrides for Bootstrap components (Tables, Cards, Modals).

### C. Citation Infrastructure
*   **Files:** `CITATION.cff` files are generated for **each individual lesson**.
*   **Automation:**
    *   `scripts/generate_lesson_cffs.py`: Parses `lessons.yml` and outputs standard CFF files to `generated_citations/`.
    *   `scripts/create_prs.sh`: A helper script (requires `gh` CLI) to clone lesson repos and open Pull Requests with the updated citation files.

## 4. Operational Workflows

### How to Add a New Lesson
1.  Add entry to `src/data/lessons.yml`.
2.  Add authors to `src/data/sitetext.yml`.
3.  Astro automatically generates the page at `/lessons/[slug]`.

### How to Update Citations
1.  Run `python scripts/generate_lesson_cffs.py`.
2.  Run `./scripts/create_prs.sh` (requires GitHub Auth).

### How to Modify Dark Mode
*   Edit `src/styles/_sass/base/_dark-mode.scss`.
*   **Note:** Use `!important` sparingly, but it is necessary for overriding some scoped Astro styles or Bootstrap defaults.

## 5. Recent History (Jan 2026)
*   **Migration:** Moved from Jekyll to Astro v5.
*   **UX Redesign:** Implemented "Pilot First" design strategy.
*   **Optimization:** Fixed navigation links and mobile responsiveness for tables.
