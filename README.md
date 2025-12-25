# Open Science for Librarians

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.18055759.svg)](https://doi.org/10.5281/zenodo.18055759)

This is the official website for the "Lessons for Librarians in Open Science Principles and Methods" project, funded by the Institute of Museum and Library Services (IMLS).

## Project Overview

This site serves as a curriculum hub for librarians, providing access to:
*   Peer-reviewed open science lesson plans.
*   Instructor guides and resources.
*   Profiles of the lesson authors and contributors.
*   Foundational open science frameworks and references.

## Tech Stack

This site has been migrated from Jekyll to **Astro** (v5). It uses:
*   **Framework**: Astro
*   **Styling**: SCSS (Bootstrap-based Agency theme)
*   **Content**: YAML data files and Markdown
*   **Deployment**: GitHub Actions -> GitHub Pages

## Development

### Prerequisites
*   Node.js (v18 or higher recommended)
*   npm

### Quick Start

1.  Install dependencies:
    ```bash
    npm install
    ```

2.  Start the local development server:
    ```bash
    npm run dev
    ```
    Access the site at http://localhost:4321.

3.  Build for production:
    ```bash
    npm run build
    ```
    The output will be generated in the `dist/` directory.

## Managing Content

For detailed instructions on how to add lessons, update authors, or write blog posts, please refer to the **[GUIDE.md](GUIDE.md)** file in this repository.

### Key Data Files
*   `src/data/lessons.yml`: The master list of all curriculum modules and external resources.
*   `src/data/sitetext.yml`: Author profiles, staff list, and general site text.
*   `src/content/blog/`: Markdown files for blog posts.

## Deployment

This repository is configured with a GitHub Action (`.github/workflows/deploy.yml`) that automatically builds and deploys the site to GitHub Pages whenever changes are pushed to the `main` branch.

## License

This project content is available under a Creative Commons Attribution 4.0 International License (CC-BY 4.0).