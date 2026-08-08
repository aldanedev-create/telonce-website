# Teloce Website

author: ALdane Hutchinson

> The official **Teloce** website — a modern **Single Page Application (SPA)** built with **Vue 3** and **Tailwind CSS**.

The Teloce website serves as the public-facing platform for the **Teloce** TypeScript template engine. It provides everything users need in one place, including documentation, a blog, community resources, an interactive playground, and code examples.

---

# Overview

The website is built as a lightweight **Single Page Application (SPA)** using modern web technologies while keeping deployment simple.

## Technology Stack

* **Vue 3 (CDN)** — Reactive user interface framework
* **Tailwind CSS (CDN)** — Utility-first styling
* **Hash-Based Routing** — Client-side navigation
* **Vanilla JavaScript** — No build tools required

All documentation, blog posts, examples, and navigation data are loaded from JavaScript data files, making updates fast and straightforward without modifying the HTML structure.

---

# Features

## 📚 Documentation

* Complete documentation system
* Sidebar navigation
* Search with relevance scoring
* Syntax-highlighted code blocks
* Dark and light theme support

## ✍️ Blog

* Blog listing
* Category filtering
* Individual blog posts
* Social sharing buttons

## 🌐 Community

* GitHub
* Discord
* Twitter/X
* Discussions
* Contributing Guide
* Code of Conduct

## 🚀 Playground

* Interactive playground
* Live code editing
* Live preview

## 📝 Examples

* Interactive code examples
* Modal viewer
* Template section
* Script section
* Style section

---

# Project Structure

```text
website/
├── index.html                 # Single HTML entry point
├── js/
│   ├── app.js                 # Vue application setup
│   ├── components/
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   ├── Sidebar.js
│   │   ├── Hero.js
│   │   ├── Features.js
│   │   ├── FrameworkSupport.js
│   │   ├── Testimonials.js
│   │   ├── CTASection.js
│   │   ├── DocsLayout.js
│   │   ├── Search.js
│   │   ├── CodeBlock.js
│   │   ├── ThemeToggle.js
│   │   └── MobileMenu.js
│   │
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Docs.js
│   │   ├── Blog.js
│   │   ├── BlogPost.js
│   │   ├── Community.js
│   │   ├── Examples.js
│   │   ├── Playground.js
│   │   └── NotFound.js
│   │
│   ├── data/
│   │   ├── docs.js
│   │   ├── blog.js
│   │   ├── examples.js
│   │   └── nav.js
│   │
│   └── utils/
│       ├── search.js
│       ├── markdown.js
│       └── highlight.js
│
└── assets/
    ├── images/
    │   ├── logo.svg
    │   ├── framework-*.svg
    │   ├── favicon.ico
    │   ├── hero-bg.svg
    │   ├── social-og-image.png
    │   └── screenshots/
    │       ├── playground.png
    │       ├── debugger.png
    │       └── dashboard.png
    │
    └── fonts/
        ├── inter.woff2
        └── mono.woff2
```

---

# Development

## Prerequisites

Before getting started, ensure you have the following installed:

* Node.js **18+**
* pnpm **9+** *(or npm)*

---

## Installation

Clone the repository:

```bash
git clone https://github.com/telocejs/teloce.git
cd teloce/website
```

Install dependencies:

### Using pnpm

```bash
pnpm install
```

### Using npm

```bash
npm install
```

---

## Running the Development Server

### pnpm

```bash
pnpm dev
```

### npm

```bash
npm run dev
```

The development server starts at:

```text
http://localhost:5173
```

with **Hot Module Reloading (HMR)** enabled.

---

## Production Build

### Using pnpm

```bash
pnpm build
```

### Using npm

```bash
npm run build
```

Preview the production build:

### pnpm

```bash
pnpm preview
```

### npm

```bash
npm run preview
```

---

# Architecture

```text
index.html
     │
     ▼
  app.js
     │
     ▼
Vue Router
     │
     ▼
Pages
     │
     ▼
Components
     │
     ▼
Data Files
(docs.js, blog.js, examples.js, nav.js)
```

The application follows a clean separation between routing, components, and content. All page content is loaded dynamically from JavaScript data files, making the website easy to maintain and extend.

---

# Data Flow

1. `index.html` loads Vue 3 and Tailwind CSS.
2. `app.js` initializes the Vue application.
3. The router determines which page to display.
4. Pages load content from the appropriate data files.
5. Components render the UI.
6. User interactions update the interface reactively.

---

# Routing

| Route                   | Description        |
| ----------------------- | ------------------ |
| `#/`                    | Home               |
| `#/docs`                | Documentation      |
| `#/docs/:section/:page` | Documentation Page |
| `#/blog`                | Blog Listing       |
| `#/blog/:slug`          | Blog Post          |
| `#/community`           | Community          |
| `#/examples`            | Examples           |
| `#/playground`          | Playground         |
| `#/*`                   | 404 Not Found      |


# Data Management

Teloce stores website content in JavaScript data files rather than hardcoding it into components. This approach keeps the project modular and makes updates simple.

---

## Documentation (`js/data/docs.js`)

Documentation pages are organized into sections and individual pages.

```javascript
const docsData = {
  "getting-started": {
    title: "Getting Started",
    pages: {
      installation: {
        title: "Installation",
        content: "... HTML content ..."
      }
    }
  }
};
```

---

## Blog (`js/data/blog.js`)

Blog posts are stored as objects inside an array.

```javascript
const blogPosts = [
  {
    slug: "post-slug",
    title: "Post Title",
    excerpt: "Brief description...",
    date: "January 1, 2024",
    category: "Announcements",
    readTime: "5 min read",
    content: "... HTML content ..."
  }
];
```

---

## Navigation (`js/data/nav.js`)

Navigation links are centralized in a single configuration file.

```javascript
const navigation = {
  header: {
    links: [
      { label: "Docs", path: "/docs" },
      { label: "Blog", path: "/blog" }
    ]
  },

  footer: {
    product: [],
    community: [],
    resources: []
  },

  social: [
    {
      name: "GitHub",
      url: "...",
      icon: "github"
    }
  ]
};
```

---

# Components

The website is built using reusable Vue components.

## Header

Features include:

* Fixed navigation bar
* Brand logo
* Desktop navigation
* Search button
* GitHub button
* Theme toggle
* Mobile navigation menu

---

## Footer

Contains:

* Brand information
* Social links
* Product links
* Community links
* Resource links
* Copyright information

---

## Sidebar

The documentation sidebar provides:

* Expandable navigation tree
* Documentation sections
* Active page highlighting

---

## Search

The search component includes:

* Instant search
* Debounced input
* Relevance scoring
* Highlighted results
* Suggested searches

---

## CodeBlock

Provides:

* Syntax highlighting
* Copy-to-clipboard button
* Automatic language detection
* Highlight.js fallback

---

## Theme Toggle

Supports:

* Dark mode
* Light mode
* System preference detection
* Persistent theme using Local Storage

---

# Styling

## Tailwind CSS

The project uses Tailwind CSS directly from the CDN.

```html
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
```

---

## Custom CSS

Additional CSS is used for:

* Dark mode
* Custom scrollbars
* Documentation styling
* Code block styling
* Animations
* Smooth transitions

---

## Dark Mode

Dark mode is enabled by adding the `.dark` class to the `<body>` element.

```css
body.dark {
    background-color: #111827;
    color: #f9fafb;
}
```

---

# Performance

The website is designed to remain lightweight while delivering a responsive user experience.

## Optimizations

* Vue and Tailwind loaded via CDN
* Lazy-loaded components
* Debounced search
* Client-side routing
* Minimal JavaScript footprint

---

## Bundle Size

| Asset             |   Size |
| ----------------- | -----: |
| index.html        |  ~2 KB |
| app.js (minified) | ~15 KB |
| Total (gzipped)   | ~20 KB |

---

# Deployment

## Build

```bash
pnpm build
```

The production files are generated in the `dist/` directory.

---

## GitHub Pages

```bash
pnpm build
pnpm deploy
```

---

## Vercel

Install the Vercel CLI:

```bash
npm install -g vercel
```

Deploy:

```bash
vercel
```

---

## Netlify

Install the Netlify CLI:

```bash
npm install -g netlify-cli
```

Deploy:

```bash
netlify deploy --prod
```

---

# Adding New Content

## Add a Documentation Page

Open:

```text
js/data/docs.js
```

Add a new section:

```javascript
"new-section": {
  title: "New Section",
  pages: {
    "new-page": {
      title: "New Page",
      content: "<h1>New Page</h1><p>Content here...</p>"
    }
  }
}
```

---

## Add a Blog Post

Open:

```text
js/data/blog.js
```

Append a new object to the `blogPosts` array.

```javascript
{
  slug: "post-slug",
  title: "Post Title",
  excerpt: "Brief description...",
  date: "January 1, 2024",
  category: "Category",
  readTime: "5 min read",
  content: "... HTML content ..."
}
```

---

## Add an Example

Open:

```text
js/data/examples.js
```

Add a new example.

```javascript
"example-name": {
  title: "Example Title",
  description: "Brief description...",
  template: "<div>...</div>",
  script: "teloce.createApp(...)",
  style: ".class { ... }"
}
```

---

# Browser Support

| Browser        | Supported Version |
| -------------- | ----------------: |
| Chrome         |               90+ |
| Firefox        |               88+ |
| Safari         |               14+ |
| Microsoft Edge |               90+ |

---

# Contributing

We welcome contributions from the community.

Before opening a pull request, please review the project's **Contributing Guide** and follow the established coding standards and contribution workflow.

---

# License

This project is released under the **MIT License**.

---

# Useful Links

* Teloce Website
* Teloce GitHub Repository
* Teloce Documentation
* Teloce Playground

---

# Summary

The **Teloce Website** is a lightweight, modern Single Page Application built with Vue 3 and Tailwind CSS. It provides documentation, a blog, examples, community resources, and an interactive playground while maintaining a simple architecture that is easy to develop, deploy, and extend.

---

**Built with ❤️ by the Teloce Team**
