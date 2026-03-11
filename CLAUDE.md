# CLAUDE.md — AI Assistant Guide for a-brutalism-demo

## Project Overview

**a-brutalism-demo** is a static HTML5 website showcasing brutalist web design principles. It is a zero-dependency, framework-free project — no build tools, no package manager, no compilation step. All pages are served directly as plain HTML files.

The site demonstrates modern web standards (semantic HTML, CSS custom properties, vanilla ES6+ JS) applied through a brutalist aesthetic: high contrast, raw grids, monospace fonts, bold color, and glitch effects.

---

## Repository Structure

```
a-brutalism-demo/
├── index.html              # Main landing page
├── styleguide.html         # Living style guide / component reference
├── assets/
│   ├── css/
│   │   └── style.css       # All site styling (single file, 1000+ lines)
│   └── js/
│       └── shared-header.js # Header, theme toggle, mobile nav (included on all pages)
├── # Code Citations.md     # Attribution for code references and inspiration
├── README.md               # Minimal project title file
├── README_OLD.txt          # Historical notes
└── .gitattributes          # Line ending normalization (text=auto)
```

**There are no:**
- `package.json`, `node_modules`, or npm scripts
- TypeScript, ESLint, Prettier configs
- Build tools (Vite, Webpack, Rollup, Next.js, etc.)
- Test runners or test files
- CI/CD pipelines or GitHub Actions
- Environment variables or `.env` files

---

## How to Run Locally

Since this is a static site, any HTTP server will work:

```bash
# Python (usually pre-installed)
python -m http.server 8000

# Node.js (if available)
npx serve .

# Or simply open index.html in a browser
```

No installation or build step is required.

---

## Development Workflow

1. Edit HTML, CSS, or JS files directly — no compilation needed.
2. Refresh the browser to see changes.
3. Commit with descriptive messages (e.g., `Add responsive card grid to index`, `Fix theme toggle on mobile`).
4. Push to the appropriate feature branch.

**Branch convention:** Feature branches used in this project follow the pattern `claude/<description>-<id>` or `codex/<description>`.

---

## File Conventions

### HTML

- **Semantic structure:** Use `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.
- **Accessibility:** Include `aria-*` attributes on interactive elements. Use `.sr-only` for screen-reader-only text.
- **Data attributes:** Use `data-*` for JS targeting (e.g., `data-site-header`, `data-theme`).
- **Images:** Always include `alt` attributes and `loading="lazy"`.
- **Theme init:** Each HTML page must include the inline script that reads `localStorage.getItem('theme')` before the body renders to prevent flash of wrong theme.
- **JS loading:** Include `<script src="assets/js/shared-header.js"></script>` at the **end of `<body>`** on every page.
- **CSS loading:** Link `assets/css/style.css` in `<head>`.

### CSS (`assets/css/style.css`)

- **Single file** — all styles live here; do not create additional CSS files without strong justification.
- **CSS custom properties** drive theming. All color references must use variables:

  | Variable | Dark Mode | Light Mode |
  |---|---|---|
  | `--c-bg` | `#000` | `#fff` |
  | `--c-text` | `#fff` | `#000` |
  | `--c-accent` | `#f9ff3f` (neon yellow) | `#1116ff` (electric blue) |
  | `--c-accent-strong` | `#ff0050` (signal red) | `#ff0050` (signal red) |
  | `--c-muted` | `#8f8f8f` | `#5a5a5a` |
  | `--c-border` | `#fff` | `#000` |

- **Typography:** Monospace everywhere — `'Courier New', Courier, monospace`. No serif or sans-serif fonts.
- **Responsive sizing:** Use `clamp(min, preferred, max)` for font sizes and spacing.
- **Mobile-first breakpoints:** `600px`, `900px`, `1024px`.
- **No vendor prefixes** — target modern browsers only.
- **Naming:** BEM-inspired class names (e.g., `.product-card`, `.product-link`, `.nav-toggle`).
- **Hover states:** Typical pattern is `transform: translate(-6px, -6px)` paired with `box-shadow`.
- **Animations:** The `glitch` keyframe animation (skew + translate) is the signature visual effect.
- **Striped backgrounds:** Use `repeating-linear-gradient` for textured fills.
- **Borders:** 1–3px solid borders; frequently combined with offset box-shadows.

### JavaScript (`assets/js/shared-header.js`)

- **Single shared file** — included on every page; do not create per-page JS files without strong justification.
- **Vanilla ES6+** — `const`/`let`, template literals, arrow functions. No frameworks or libraries.
- **Module structure (three IIFEs):**
  1. Header template injection — builds and inserts the `<header>` HTML
  2. Theme toggle — reads/writes `localStorage` key `'theme'` (values: `'dark'` or `'light'`), updates `data-theme` on `<html>`
  3. Mobile nav toggle — handles hamburger menu open/close, updates `aria-expanded`
- **Graceful degradation:** Always check for element existence before manipulating DOM.
- **localStorage safety:** Wrap in try/catch; privacy mode may block access.
- **No external dependencies:** Do not import libraries.

---

## Design Principles (Brutalism)

When adding new UI or modifying existing components, adhere to these rules:

1. **High contrast is mandatory** — black on white, white on black. Never use low-contrast color combinations.
2. **Monospace only** — no Google Fonts, no web fonts, no sans-serif or serif typefaces.
3. **Bold, flat color** — no gradients, no drop shadows for depth (offset box-shadow is fine for brutalist effect).
4. **Raw grid layouts** — visible structure, explicit borders, no soft rounded corners (use `border-radius: 0` or very minimal rounding).
5. **Uppercase text** — headers and labels use `text-transform: uppercase`.
6. **Neon accents sparingly** — accent colors punch through, not everywhere.
7. **Both themes must work** — any new component must look correct in both dark and light mode using the CSS variable system.

---

## Theming

Theme is controlled via `data-theme` attribute on `<html>`:
- `data-theme="dark"` — default
- `data-theme="light"` — toggled by user

The shared-header.js script manages toggling and persisting to `localStorage` under the key `'theme'`.

**Rule:** Never hardcode `#000` or `#fff` in component styles. Always use `var(--c-bg)`, `var(--c-text)`, etc.

---

## Adding New Pages

1. Copy the HTML boilerplate from `index.html` (the `<head>`, inline theme script, and closing JS `<script>` tag).
2. Update `<title>` and meta tags.
3. Place the file in the project root (flat structure — no subdirectories for pages).
4. Add navigation links in `shared-header.js` if the page should appear in the site nav.
5. Update `styleguide.html` if new components are introduced.

---

## Style Guide

`styleguide.html` is the living design reference. When introducing new reusable components, add an example to the style guide so future contributors (human or AI) can see the intended appearance and markup pattern.

---

## Attribution

Any code snippets or patterns sourced from external repositories must be logged in `# Code Citations.md` with the source URL and license.

---

## What NOT to Do

- Do not introduce a build tool, bundler, or package manager unless explicitly requested.
- Do not add JavaScript frameworks (React, Vue, Svelte, etc.).
- Do not add external CSS frameworks (Tailwind, Bootstrap, etc.).
- Do not add web fonts or icon libraries.
- Do not split CSS into multiple files.
- Do not use CSS preprocessors (Sass, Less).
- Do not add TypeScript.
- Do not round corners heavily — this is brutalism.
- Do not use gradients for backgrounds.
- Do not hardcode colors outside the CSS variable system.
