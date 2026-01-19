# Keystatic CMS Integration Guide for Astro 5 Static Sites

## Context

This guide documents the solution for integrating Keystatic CMS into an Astro 5 static site deployed to GitHub Pages. The setup allows content editors (especially in OSPO context) to edit lessons and blog posts through a UI without needing to work directly with code.

## The Problem

When integrating Keystatic v0.5.48 with Astro 5 (React 18, static output mode), we encountered a critical validation error:

```
Field validation failed: [fieldname]: Unexpected error: TypeError: f.parse is not a function
```

This error occurred on **every single field** when opening any content entry in the Keystatic Admin UI.

### Technical Environment

- **Astro:** 5.16.6 (static output mode)
- **React:** 18.3.1 (downgraded from 19)
- **Keystatic:** @keystatic/core@0.5.48, @keystatic/astro@5.0.6
- **Deployment:** GitHub Pages (static)
- **Custom setup:** Manually mounting `<Keystatic />` component to bypass SSR adapter requirement

## Root Cause Analysis

### Gemini's Initial Diagnosis

Gemini correctly identified that the error "f.parse is not a function" suggests field definition objects were losing their prototype methods, indicating:

1. Multiple instances of `@keystatic/core` being loaded
2. Vite/Astro bundling breaking object identity
3. Module resolution mismatch between different contexts

The hypothesis: When `keystatic.config.ts` is imported in the browser, Vite bundles `@keystatic/core` differently than during the build phase, creating two "versions" of the Field class. Validation fails because `instanceof` checks don't match across these different instances.

### What Didn't Work

1. **Attempt 1:** Downgrading React 19 → 18
   - Result: No effect

2. **Attempt 2:** Excluding React/React-DOM from Vite optimization
   ```js
   optimizeDeps: {
     exclude: ['@keystatic/core', '@keystatic/astro', 'zod', 'react', 'react-dom'],
   }
   ```
   - Result: ❌ Build error: "The entry point 'react-dom' cannot be marked as external"
   - Why it failed: Astro requires React to be bundled, can't exclude it

## The Working Solution

### Core Fix: Use `ssr.noExternal` Instead

The solution is to force Keystatic packages to be bundled consistently across server and client contexts:

```javascript
// astro.config.mjs
export default defineConfig({
  // ... other config
  vite: {
    optimizeDeps: {
      // Exclude from pre-bundling to prevent optimization issues
      exclude: ['@keystatic/core', '@keystatic/astro', 'zod'],
    },
    ssr: {
      // Force these packages to be bundled, preserving module identity
      noExternal: ['@keystatic/core', '@keystatic/astro'],
    },
  },
});
```

### Supporting Changes

**1. Extract Keystatic component to separate file**

Create `src/components/KeystaticApp.tsx`:
```tsx
import { Keystatic } from '@keystatic/core/ui';
import config from '../../keystatic.config';

export default function KeystaticApp() {
  return <Keystatic config={config} />;
}
```

**2. Simplify the Astro page**

Update `src/pages/keystatic/index.astro`:
```astro
---
import KeystaticApp from '../../components/KeystaticApp';

export const prerender = true;
---

<script>
  // SPA redirect handler for GitHub Pages
  (function(l) {
    if (l.search) {
      var q = {};
      l.search.slice(1).split('&').forEach(function(v) {
        var a = v.split('=');
        q[a[0]] = a.slice(1).join('=').replace(/~and~/g, '&');
      });
      if (q.p !== undefined) {
        window.history.replaceState(null, null,
          l.pathname.slice(0, -1) + (q.p || '') +
          (q.q ? ('?' + q.q) : '') +
          l.hash
        );
      }
    }
  }(window.location))
</script>

<KeystaticApp client:only="react" />
```

## Why This Works

1. **`optimizeDeps.exclude`** prevents Vite from pre-bundling these packages during dev, which can create separate instances

2. **`ssr.noExternal`** forces Astro to include these packages in the SSR bundle (even though we're static), ensuring they're processed consistently

3. **Including `zod`** in exclusions prevents Zod (which Keystatic uses heavily for validation) from being double-bundled

4. **Component extraction** creates a clearer boundary and potentially helps with module resolution

## Step-by-Step Implementation Guide

### 1. Install Dependencies

```bash
npm install @keystatic/core @keystatic/astro @astrojs/react react react-dom
```

### 2. Configure Astro

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import keystatic from '@keystatic/astro';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [
    react(),
    // Only load Keystatic in development to avoid adapter requirement
    ...(process.env.NODE_ENV === 'development' ? [keystatic()] : []),
  ],
  vite: {
    optimizeDeps: {
      exclude: ['@keystatic/core', '@keystatic/astro', 'zod'],
    },
    ssr: {
      noExternal: ['@keystatic/core', '@keystatic/astro'],
    },
  },
  output: 'static',
});
```

### 3. Create Keystatic Config

```typescript
// keystatic.config.ts
import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: import.meta.env.PROD
    ? {
        kind: 'cloud',
      }
    : {
        kind: 'local',
      },
  cloud: {
    project: 'your-org/your-repo',
  },
  collections: {
    lessons: collection({
      label: 'Lessons',
      slugField: 'name',
      path: 'src/content/lessons/*',
      format: 'yaml',
      schema: {
        name: fields.slug({ name: { label: 'Lesson Name' } }),
        // ... your fields
      },
    }),
  },
});
```

### 4. Create the Keystatic Component

```tsx
// src/components/KeystaticApp.tsx
import { Keystatic } from '@keystatic/core/ui';
import config from '../../keystatic.config';

export default function KeystaticApp() {
  return <Keystatic config={config} />;
}
```

### 5. Create the Admin Page

```astro
---
// src/pages/keystatic/index.astro
import KeystaticApp from '../../components/KeystaticApp';

export const prerender = true;
---

<KeystaticApp client:only="react" />
```

### 6. Test It

```bash
# Clear Vite cache and start dev server
rm -rf node_modules/.vite
npm run dev
```

Navigate to `http://localhost:4321/keystatic` and test editing content.

## Alternative Solution (If Issues Persist)

If you still encounter the `f.parse` error, add explicit deduplication:

```javascript
// astro.config.mjs
vite: {
  resolve: {
    dedupe: ['@keystatic/core', 'zod', 'react', 'react-dom'],
  },
  optimizeDeps: {
    exclude: ['@keystatic/core', '@keystatic/astro', 'zod'],
  },
  ssr: {
    noExternal: ['@keystatic/core', '@keystatic/astro'],
  },
}
```

## GitHub Pages Deployment

For GitHub Pages with client-side routing to work, you need a redirect script. The setup above includes this in the Keystatic page.

Additionally, create a `404.astro` page that handles the redirect for the main site:

```astro
---
// src/pages/404.astro
export const prerender = true;
---

<script>
  (function(l) {
    if (l.search) {
      var q = {};
      l.search.slice(1).split('&').forEach(function(v) {
        var a = v.split('=');
        q[a[0]] = a.slice(1).join('=').replace(/~and~/g, '&');
      });
      if (q.p !== undefined) {
        window.history.replaceState(null, null,
          l.pathname.slice(0, -1) + (q.p || '') +
          (q.q ? ('?' + q.q) : '') +
          l.hash
        );
      }
    }
  }(window.location))
</script>
```

## Keystatic Cloud Setup

For production editing on GitHub Pages:

1. Sign up at https://keystatic.cloud
2. Connect your GitHub repository
3. Configure the cloud project in `keystatic.config.ts`
4. The config already switches to cloud mode in production:
   ```typescript
   storage: import.meta.env.PROD
     ? { kind: 'cloud' }
     : { kind: 'local' }
   ```

## Troubleshooting

### Still seeing "f.parse is not a function"?

1. Clear all caches: `rm -rf node_modules/.vite dist .astro`
2. Reinstall: `npm install`
3. Check for multiple zod versions: `npm list zod`
4. Add dedupe config (see Alternative Solution above)

### Build errors about external packages?

Don't try to exclude React/React-DOM from optimization. Only exclude Keystatic packages and Zod.

### OAuth callback issues on GitHub Pages?

Ensure your 404 redirect script preserves query parameters (it's included in the setup above).

## Use Case: OSPO Context

This setup is ideal for:
- Allowing non-technical contributors to edit curriculum content
- Managing lesson metadata (authors, duration, learning objectives)
- Editing blog posts with rich text
- No need to understand Git/GitHub directly
- Changes still go through Git for version control

## References

- Keystatic Documentation: https://keystatic.com
- Astro Integration Guide: https://keystatic.com/docs/integrations/astro
- Original Issue: Module instance mismatch in Vite/Astro causing prototype loss

## Credits

Solution developed through collaborative debugging with:
- Gemini (initial diagnosis and analysis)
- Claude Sonnet 4.5 (implementation and testing)
- Commit: `ed7c3bb`
