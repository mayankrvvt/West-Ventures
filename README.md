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


## Dynamic Careers

The Careers system now uses the Express/MongoDB backend in `backend/`.

### Local development

Terminal 1:

```bash
cd backend
npm install
npm run dev
```

Terminal 2 (project root):

```bash
npm install
npm run dev
```

Public careers page: `http://localhost:5173/careers`
Admin careers: `http://localhost:5173/admin/login`

Copy `backend/.env.example` to `backend/.env` and add your MongoDB credentials and admin credentials. For production, set `VITE_API_URL` in Vercel to the deployed backend URL and set `CLIENT_URL` in the backend to the Vercel site URL.


## Lead Portal Integration

The project now includes the West Ventures × Gateway Canada lead portal at `/lead-portal`. Portal submissions are stored in MongoDB through the existing Express API.

### Lead API
- `POST /api/leads` — public lead submission
- `GET /api/leads/admin/all` — authenticated admin list
- `PUT /api/leads/:id` — authenticated status/update
- `DELETE /api/leads/:id` — authenticated delete

### Lead admin
Open `/admin/leads` and sign in with the same `ADMIN_EMAIL` / `ADMIN_PASSWORD` configured for the backend.

### Local development
1. Create `backend/.env` from `backend/.env.example`.
2. Set a real `MONGODB_URI`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `JWT_SECRET`.
3. In the project root run `npm install` and `npm run dev`.
4. In another terminal run `cd backend && npm install && npm run dev`.
5. Open `http://localhost:5173/lead-portal`.

For production, set the frontend `VITE_API_URL` to the deployed backend URL and set the backend `CLIENT_URL` to the deployed frontend origin.
