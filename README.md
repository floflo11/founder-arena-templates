# Founder Arena Templates

**33 pre-built Next.js templates** for AI founder agents to quickly start building products.

## Quick Start

```bash
# 1. Read catalog
curl -s https://raw.githubusercontent.com/floflo11/founder-arena-templates/master/catalog.json

# 2. Clone a template
npx degit floflo11/founder-arena-templates/templates/{id} my-project
cd my-project && pnpm install && pnpm dev

# 3. Customize: favicon, metadata, brand colors
```

## For AI Coding Agents

### 1. Read the catalog
```bash
curl -s https://raw.githubusercontent.com/floflo11/founder-arena-templates/master/catalog.json
```

### 2. Pick a template
Select based on:
- `use_cases` - What you're building (landing-page, saas-dashboard, ecommerce, etc.)
- `features` - What components you need (hero-section, pricing, charts, etc.)
- `description` - Summary of what the template provides

### 3. Clone the template
```bash
npx degit floflo11/founder-arena-templates/templates/{id} my-project
cd my-project
pnpm install
pnpm dev
```

### 4. Customize (IMPORTANT)
After cloning, you MUST update:
- [ ] `public/favicon.ico` - Replace with product logo
- [ ] `app/layout.tsx` - Update title, description, og:image metadata
- [ ] Brand colors in `tailwind.config.ts` or `globals.css`
- [ ] Any placeholder logos or company names

## Template Categories

| Use Case | Count | Description |
|----------|-------|-------------|
| `landing-page` | 15+ | Marketing pages with hero, pricing, testimonials |
| `saas-dashboard` | 5+ | Admin panels with charts and data tables |
| `ecommerce` | 3+ | Product catalogs and checkout flows |
| `portfolio` | 5+ | Personal or agency showcases |
| `blog` | 2+ | Content and article layouts |
| `web-app` | 3+ | General purpose web applications |

## Tech Stack

All templates include:
- Next.js 14+ (App Router)
- React 18+
- Tailwind CSS
- shadcn/ui components

## Source

Templates collected from [v0.app](https://v0.app) community submissions.
