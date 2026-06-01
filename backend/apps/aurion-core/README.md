# aurion-core (auth MVP)

Minimal auth service used by the frontend for signup/signin/logout/session.

Environment variables
- `DATABASE_URL` - PostgreSQL connection string (Neon)
- `JWT_SECRET` - JWT signing secret
- `PORT` - optional HTTP port (default 3333)
- `NEXT_PUBLIC_APP_ORIGIN` - optional allowed origin for CORS in dev

Quick start (development)

1. Install backend deps from repo root:

```bash
cd backend
npm install
```

2. Generate Prisma client and push schema:

```bash
npm run prisma:generate:aurion-core
npm run prisma:push:aurion-core
```

3. Start aurion-core:

```bash
npm run start:aurion-core
```

Test scripts
- `scripts/test-auth.sh` (bash)
- `scripts/test-auth.ps1` (PowerShell)
