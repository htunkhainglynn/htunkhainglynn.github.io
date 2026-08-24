# Htun Khaing Lynn — Developer Portfolio

A static developer portfolio and technical blog built with Astro, TypeScript, Tailwind CSS, Markdown/MDX, and Astro Content Collections. Git is the CMS: adding an article and pushing it is the entire publishing workflow.

## Requirements

- Node.js 24 or newer
- npm 11 or newer

## Local development

```bash
npm install
npm run dev
```

Astro prints the local URL, usually `http://localhost:4321`.

Other useful commands:

```bash
npm run check     # Validate Astro and TypeScript
npm run build     # Validate and create the production site in dist/
npm run preview   # Preview the production build locally
```

## Personalize the site

The editable content is intentionally separate from the UI:

- `src/data/site.ts` — name, role, bio, email, GitHub, and LinkedIn
- `src/data/experience.ts` — roles, achievements, and technologies
- `src/data/projects.ts` — projects, engineering challenges, and links
- `src/data/education.ts` — education and certifications

The included career, education, project, contact, and repository details are representative placeholders. Replace them before publishing.

## Publish a blog article

Create a Markdown or MDX file in `src/content/blog/`. The filename becomes the URL slug:

```text
src/content/blog/how-kafka-partitions-work.md
→ /blog/how-kafka-partitions-work/
```

Use this frontmatter:

```yaml
---
title: "How Kafka Partitions Actually Work"
description: "My notes on Kafka partitions, replication, and ordering."
publishedDate: 2026-08-24
updatedDate: 2026-08-25 # optional
tags:
  - Kafka
  - Distributed Systems
draft: false
---
```

Fields are validated during the build:

| Field | Required | Purpose |
| --- | --- | --- |
| `title` | Yes | Article and SEO title |
| `description` | Yes | Listing copy and meta description |
| `publishedDate` | Yes | Sort order and publication metadata |
| `updatedDate` | No | Last-updated metadata |
| `tags` | No | Topic filters and generated tag pages |
| `draft` | No | Excludes an article when `true`; defaults to `false` |

Markdown headings generate the table of contents. Fenced code blocks use Shiki syntax highlighting and receive a copy button. MDX is available for an article that needs richer components.

## Add a project

Add an object to `src/data/projects.ts`. Every project supports:

- name and description
- technology list
- GitHub repository and optional live demo
- engineering challenges
- optional `featured: true` placement on the home page

## Update experience

Edit `src/data/experience.ts`. Each role supports the company, position, period, description, technologies, and a list of achievements. The page timeline updates automatically.

## Production build

```bash
npm run build
npm run preview
```

The production output is fully static and appears in `dist/`.

## Deploy to GitHub Pages

The workflow at `.github/workflows/deploy.yml` automatically detects whether the repository is a user site or project site, sets the correct Astro base path, builds with `npm ci`, and deploys `dist/`.

1. Create a GitHub repository and push this project to its `main` branch.
2. Open **Settings → Pages** in GitHub.
3. Set **Source** to **GitHub Actions**.
4. Push to `main` or run the workflow manually.

For `username.github.io`, the site uses `/` as its base path. For a repository such as `portfolio`, it uses `/portfolio`. No source changes are required.

For a custom domain, set `SITE_URL` to the custom origin and `BASE_PATH=/` in the workflow, then add the domain to GitHub Pages settings. You may also add a `public/CNAME` file containing the domain.

## Publishing model

```text
Write Markdown
      ↓
git add .
      ↓
git commit
      ↓
git push
      ↓
GitHub Actions
      ↓
GitHub Pages
```

There is no database, admin dashboard, API, authentication system, or client-side application framework.
