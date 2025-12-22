# Project Migration Log & UC OSPO Blueprint

This document contains the technical log of the **UCLA IMLS Open Science** migration and the "Master Prompt" required to replicate this architecture for the **UC OSPO Education Network**.

---

## Part 1: Migration Log (What We Built)

**Project:** IMLS Open Science for Librarians (Migration & Redesign)
**From:** Jekyll (Legacy) → **To:** Astro v5 (Modern)

### 1. Architecture & Data Strategy
*   **Centralized Data**: Moved from scattered HTML/Markdown to structured YAML data sources (`lessons.yml` and `sitetext.yml`). The site now treats content like a database.
*   **Dynamic Routing**: Created `[slug].astro` templates to automatically generate 50+ pages (Lesson Details, Author Profiles) from a single data entry.
*   **Cross-Referencing**: Built logic to link Authors to Lessons and Lessons to Authors bi-directionally.

### 2. User Experience (UX) & Discovery
*   **Scaffolding**: Replaced flat lists with **Curated Pathways** ("Start Here," "Browse Curriculum," "Find Tools") to guide users by intent.
*   **Real-Time Discovery**: Implemented a JavaScript-based search bar and thematic filtering system (e.g., "Data Management," "Technical Skills") that works instantly without page reloads.
*   **Unified Resource Grid**: Integrated external resources (NASA TOPS, ACRL Cookbook) alongside internal lessons, visually distinguished by color and icons.

### 3. Academic & Professional Recognition
*   **Credit Infrastructure**: Implemented `CITATION.cff` parsing to auto-generate APA and BibTeX citations for the project.
*   **Author Profiles**: Created dedicated portfolio pages for every contributor, fetching their photos and linking their ORCIDs.
*   **Governance Tracking**: Added metadata to track Lesson Lifecycle (Alpha/Beta/Stable), Pilot History (where/when taught), and Governance Milestones (LC Adoption).

### 4. Compliance & Infrastructure
*   **Accessibility**: Audited and fixed contrast ratios, missing labels, and heading structures to meet **WCAG 2.1 AA** standards.
*   **IMLS Compliance**: Integrated mandatory grant disclaimers and branding across the footer and about pages.
*   **DevOps**: Created GitHub Actions to deploy the site and automatically sync lesson data to the **Organization Profile README**.

---

## Part 2: The "Master Prompt" for UC OSPO

*Use the prompt below in a new session to build the UC OSPO site using this exact architecture.*

---

**PROMPT START**

I need you to build a static documentation and education hub for the **UC OSPO Education Network**. I want to replicate the architecture of a successful Astro-based curriculum site.

**Technical Stack:**
*   **Framework:** Astro (v5+)
*   **Styling:** SCSS with Bootstrap 5.
*   **Data Source:** YAML files in `src/data/` (Single Source of Truth).
*   **Deployment:** GitHub Pages via GitHub Actions.

**Core Architecture Requirements:**

1.  **Data-Driven Pages:**
    *   Create a `resources.yml` file that acts as the database. It should hold metadata for: Title, Abstract, Authors, Duration, License, Repository URL, and "Type" (Internal Curriculum vs. External Reference).
    *   Create an `authors.yml` file for people. Include fields for: Name, Role, Affiliation, Image URL, and ORCID.
    *   Use Astro's `getStaticPaths()` to dynamically generate a **Detail Page** for every resource and a **Profile Page** for every author.

2.  **Bi-Directional Linking:**
    *   On a Resource page, list the Authors (linked to their profiles).
    *   On an Author page, list the Resources they contributed to (linked to the resources).

3.  **Discovery Interface (Homepage):**
    *   **Pathways:** Create a "Pathways" component at the top that guides users based on intent (e.g., "For Researchers," "For Administrators," "Getting Started").
    *   **Filterable Grid:** Build a card grid for resources that supports **Real-time Filtering** (by topic/category) and **Text Search**.
    *   **Visual Distinction:** Visually differentiate between "Network Created" resources (branded style) and "External References" (distinct border/badge).

4.  **Academic & Community Features:**
    *   **Citation:** Create a component that parses a `CITATION.cff` file and displays a copy-pasteable APA/BibTeX citation.
    *   **Status Tracking**: Display badges for resource maturity (Alpha/Beta/Stable) and include a "Workshop History" section on resource pages.
    *   **Governance**: Add fields to track if a resource has been formally adopted or reviewed by the governance board.

5.  **DevOps & Maintenance:**
    *   Write a GitHub Action that syncs the list of resources from the website's YAML data to the Organization's Profile README.

**Design Philosophy:**
The site should feel like a **Professional Academic Hub**. It needs to give credit to contributors (students and staff), meet WCAG 2.1 AA Accessibility standards, and clearly acknowledge funding sources.

Please start by scaffolding the Astro project structure and defining the `resources.yml` schema.

**PROMPT END**

---

## Part 3: Key Files to Copy Over (Shortcuts)

When building the new site, copy these files from the `ucla-imls-open-sci` repo to the new UC OSPO repo to save time:

1.  **`src/utils/slugs.ts`**: The slug generator helper.
2.  **`scripts/generate_readme_table.py`**: The script that syncs data to the GitHub profile.
3.  **`.github/workflows/sync-readme.yml`**: The workflow that runs the script.
4.  **`src/components/Citation.astro`**: The CFF parser component.
5.  **`src/components/SEO.astro`**: The social meta-tag component.
6.  **`src/pages/rss.xml.js`**: The RSS feed generator.
