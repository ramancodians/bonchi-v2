# Production Build - Quick Start

## Run Production Build

```bash
npm run prod
```

This single command:
1. ✅ Builds all packages (shared, server, web)
2. ✅ Builds web client → copies to `server/client-dist/`
3. ✅ Starts Express server in production mode

## What Happens

### Build Phase
- **Shared package**: TypeScript compiled to `dist/`
- **Server package**: TypeScript compiled to `dist/`
- **Web package**: Vite builds React app to `dist/`
- **Client distribution**: Web `dist/` copied to `server/client-dist/`

### Runtime Phase
- **Express server** runs on port 3000 (or `API_PORT`)
- **Static files** served from `server/client-dist/`
- **API routes** available under `/api/*`
- **SPA routing**: All routes serve `index.html` for React Router

## Files Created

```
packages/
├── server/
│   ├── dist/              # Compiled server
│   └── client-dist/       # ← Web client (production)
│       ├── index.html
│       ├── assets/
│       └── ...
├── web/
│   └── dist/              # Vite output (temporary)
└── shared/
    └── dist/              # Compiled shared code
```

## Environment

Set `NODE_ENV=production` in `.env`:

```env
NODE_ENV=production
API_PORT=3000
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret
```

## Deploy

```bash
# 1. Install
npm install

# 2. Build & run
npm run prod
```

Server available at `http://localhost:3000`

## Architecture

```
                  ┌─────────────────────┐
                  │   npm run prod      │
                  └──────────┬──────────┘
                             │
            ┌────────────────┼────────────────┐
            ▼                ▼                ▼
    ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
    │   shared/    │ │   server/    │ │    web/      │
    │   (build)    │ │   (build)    │ │   (build)    │
    └──────────────┘ └──────────────┘ └──────┬───────┘
                                              │
                                              ▼
                                    ┌──────────────────┐
                                    │ build-client.ts  │
                                    │ Copy to server/  │
                                    └────────┬─────────┘
                                             │
                                             ▼
                              ┌──────────────────────────┐
                              │  Express Server (prod)   │
                              │  - Serves static files   │
                              │  - Serves API routes     │
                              │  - SPA fallback routing  │
                              └──────────────────────────┘
```

## Individual Commands

```bash
# Build all packages
npm run build

# Build client only
npm run build:client

# Start server (after building)
cd packages/server && npm run start:prod
```

See [PRODUCTION_BUILD.md](./PRODUCTION_BUILD.md) for detailed documentation.
