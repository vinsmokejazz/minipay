## MiniPay Monorepo

MiniPay is a demo fintech stack that pairs an Express/Mongo backend with a modern Next.js frontend. The backend exposes secure auth, user, and account APIs; the frontend provides a marketing site plus protected dashboard flows for signing up, signing in, viewing balances, and performing transfers.

### Backend (Express + Mongo + Redis)
- **Tech**: Node 18+, Express, MongoDB via Mongoose, Redis caching, Zod validation, rate-limit middleware.
- **Key routes**: `/api/v1/signup`, `/signin`, `/auth/refresh`, `/auth/logout`, `/user/me`, `/account/balance`, `/account/transfer`.
- **Environment variables** (see `backend/.env.example`):
	- `PORT` – server port.
	- `MONGO_URI` – Mongo connection string.
	- `JWT_SECRET` – secret for access tokens.
	- `REDIS_URL` (if not local default).
	- `CORS_ORIGIN` – optional allowlist for frontend.
- **Run it**:

```powershell
cd backend
npm install
npm run dev
```

### Frontend (Next.js 16 + Tailwind + Framer Motion)
- **Features**: dark marketing page, auth flows under `app/(auth)`, dashboard + transfer views under `app/(dashboard)`, Zustand auth store, SWR balance polling, Framer Motion animations.
- **Environment**: create `frontend/.env.local` with `NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1` (adjust for your backend host). Tokens are stored via cookies/zustand; middleware guards `/dashboard` routes.
- **Run it**:

```powershell
cd frontend
npm install
npm run dev
```

### Development Tips
- Start backend before frontend so the Next app can proxy to live APIs.
- Use `npm run lint` in each package to verify formatting/types.
- Update both READMEs (`backend/README.md`, `frontend/README.md`) for deeper instructions when flows change.

