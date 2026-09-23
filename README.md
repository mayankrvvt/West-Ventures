# West Ventures — Marketing Site

## Getting started

```bash
npm install
cp .env.example .env   # already done for you; edit values as needed
npm run dev
```

Open the printed local URL (usually http://localhost:5173).

## Structure

- `src/app` — root App component that assembles the page shell (Navbar + page + Footer)
- `src/components` — shared chrome used across pages (Navbar, Footer)
- `src/features/home` — the home page's sections (Hero, Services, Approach, About, CtaBanner)
- `src/constants` — site copy and data (nav links, services, stats, contact info)
- `src/hooks` — small reusable hooks (scroll position, on-screen detection, count-up animation)
- `src/services` — outbound calls, e.g. the contact form submission
- `src/utils` — small helpers
- `src/styles` — design tokens (`variables.css`) and global styles

## Adding the next page

When you're ready for About, Careers, etc., add a folder under `src/features/` (e.g. `src/features/about/AboutPage.jsx`) and wire it up with a router (React Router is a good fit) in `src/app/App.jsx`.
