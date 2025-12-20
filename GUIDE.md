# Site Maintenance & Astro Guide

Welcome to the new **UCLA IMLS Open Science** site! This site has been migrated from **Jekyll** to **Astro**. This guide will help you maintain the content and understand how the new system works.

## 🚀 Quick Start

1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Start Development Server**:
    ```bash
    npm run dev
    ```
    Access the site at `http://localhost:4321`.
3.  **Build for Production**:
    ```bash
    npm run build
    ```

---

## 📝 Managing Content

Unlike Jekyll, which uses global data "magic," Astro imports data explicitly. Here is where your content lives:

### 1. Adding/Editing Lessons
*   **Data File**: `src/data/lessons.yml`
*   **Images**: No images required for lessons (they use the standard blue banner), but you can customize this in `src/pages/lessons/[slug].astro`.
*   **How to Add**:
    Copy an existing lesson block and paste it at the bottom.
    ```yaml
    - name: "My New Lesson"
      status: alpha  # Options: pre-alpha, alpha, beta, stable
      type: internal # Use 'external' for things like NASA TOPS or Cookbook
      authors:
      - "Author Name" # Must match a name in sitetext.yml exactly!
      educationalLevel: Introductory
      duration: "3h"
      abstract: "A short summary..."
      learningResourceType: lesson
      url: "https://external-link-to-lesson..."
      repo: "https://github.com/..."
    ```

### 2. Adding/Editing Authors
*   **Data File**: `src/data/sitetext.yml` (Scroll down to `authors` -> `people`)
*   **Images**: Upload photos to `public/assets/img/authors/`.
*   **How to Add**:
    ```yaml
      - name: "Jane Doe"
        role: "Data Librarian, UCLA"
        image: assets/img/authors/jane_doe.jpg
        orcid: 0000-xxxx-xxxx-xxxx
        social:
          - url: jane@example.com
            icon: fas fa-envelope
    ```
    *Note: The `name` here must match the `authors` list in `lessons.yml` to link them correctly!*

### 3. Writing Blog Posts
*   **Location**: `src/content/blog/`
*   **Format**: Standard Markdown (`.md`).
*   **Frontmatter**:
    ```yaml
    ---
    title: "New Grant Opportunity"
    date: 2024-03-15
    author: "Tim Dennis"
    description: "Short summary for the card..."
    ---
    ```

---

## 👩‍💻 Astro for Jekyll Users

If you are coming from Jekyll, here is how to translate your mental model to Astro.

### 1. The "Component" Model
In Jekyll, you used **Includes** (`{% include header.html %}`).
In Astro, we use **Components** (`<Header />`).

*   **Jekyll**: A snippet of HTML text pasted into another file. Hard to pass data to it.
*   **Astro**: A self-contained block of code. It has a "Frontmatter Script" (the top part between `---`) where you write JavaScript/TypeScript to fetch data, and a "Template" (the bottom part) where you write HTML.

**Example (`LessonCard.astro`):**
```astro
---
// 1. JavaScript logic happens here (Server-side only!)
const { lesson } = Astro.props; // Receive data passed to this component
const isBeta = lesson.status === 'beta';
---
<!-- 2. HTML template uses the data -->
<div class="card">
  <h2>{lesson.name}</h2>
  {isBeta && <span class="badge">Beta</span>}
</div>
```

### 2. Layouts
*   **Jekyll**: `_layouts/default.html` with `{{ content }}`.
*   **Astro**: `src/layouts/Layout.astro` with `<slot />`.
    You wrap your pages in the layout:
    ```astro
    <Layout title="My Page">
      <p>This content goes into the slot.</p>
    </Layout>
    ```

### 3. Dynamic Pages (`[slug].astro`)
In Jekyll, you made a file for every page, or used Collections.
In Astro, we use **Dynamic Routing**.

*   `src/pages/lessons/[slug].astro`: This **one file** generates **all** your lesson pages.
*   It uses a special function `getStaticPaths()` to tell Astro: "Look at `lessons.yml`, make a list of all lesson names, and generate a page for each one using this template."

### 4. Styles (SCSS)
*   **Jekyll**: Global styles in `_sass` that apply to everything.
*   **Astro**: You can still use global styles (we do in `src/styles/agency.scss`), BUT you can also write scoped styles right inside a component:
    ```astro
    <style>
      h1 { color: red; } /* This ONLY affects h1s in this specific component! */
    </style>
    ```

### 5. Deployment (GitHub Actions)
We have set up a workflow in `.github/workflows/deploy.yml`.
*   Every time you `git push` to `main`, GitHub:
    1.  Spins up a server.
    2.  Installs `npm` dependencies.
    3.  Runs `npm run build` (creating the `dist/` folder).
    4.  Deploys `dist/` to your `gh-pages` branch.

## 🛠 Troubleshooting

*   **"Component is not defined"**: Did you import it?
    `import LessonCard from '../components/LessonCard.astro';`
*   **"Image not found"**: Ensure the path starts with `/` (e.g., `/assets/img/...`) and the file is inside the `public/` folder.
*   **"Unknown Compiler Error"**: Usually a syntax error in your HTML/JSX. Check for unclosed tags or weird nesting (like putting a `<div>` inside a `<p>`).
