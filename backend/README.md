# West Ventures Careers Backend

Express + MongoDB API for the dynamic Careers page and admin job management.

## Setup

1. Copy `.env.example` to `.env`.
2. Add your MongoDB connection string.
3. Set a strong `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `JWT_SECRET`.
4. Install dependencies:

```bash
cd backend
npm install
```

5. Start the API:

```bash
npm run dev
```

The API runs on `http://localhost:5050`.

## Endpoints

- `GET /api/health`
- `GET /api/jobs` — public open positions
- `GET /api/jobs/:id` — public open position
- `POST /api/admin/login` — admin login
- `GET /api/jobs/admin/all` — authenticated admin
- `POST /api/jobs` — authenticated admin
- `PUT /api/jobs/:id` — authenticated admin
- `DELETE /api/jobs/:id` — authenticated admin
