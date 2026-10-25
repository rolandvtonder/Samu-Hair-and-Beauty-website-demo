# Samu's Hair & Beauty — website demo

Live demo: https://rolandvtonder.github.io/Samu-Hair-and-Beauty-website-demo/

A five-page site for Samu's Hair & Beauty, Saxonwold, Rosebank: a
scroll-choreographed home page, plus Services, Gallery, Reviews and About.

Built with Vite, React, TypeScript, Tailwind CSS v4 and Motion.

## Run locally

```bash
npm install
npm run dev
```

## Where things live

- `src/site.ts` — contact details, services, gallery captions and reviews
- `src/layout.ts` — positions on the home page's scroll stage (desktop and phone)
- `src/scroll.ts` — the scroll timeline for the home page
- `src/pages.tsx` — the Services, Gallery, Reviews and About pages
- `public/assets/` — photos

Every push to `main` rebuilds and redeploys the site through
`.github/workflows/deploy.yml`.
