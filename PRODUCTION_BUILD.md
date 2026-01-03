# Production Build Guide

## Overview

The production build system compiles the entire monorepo and bundles the web client into the Express server for deployment as a single service.

## Architecture

```
┌─────────────────────────────────────────┐
│         npm run prod                    │
├─────────────────────────────────────────┤
│ 1. Build all packages (Turbo)          │
│    - packages/shared → dist/            │
│    - packages/server → dist/            │
│    - packages/web → dist/               │
│                                          │
│ 2. Build client (scripts/build-client)  │
│    - Copy web/dist → server/client-dist/│
│                                          │
│ 3. Start production server              │
│    - Express serves API + static files  │
└─────────────────────────────────────────┘
```

## Commands

### Development
```bash
# Run all packages in dev mode (parallel)
npm run dev
```

### Production Build & Run
```bash
# Complete production build + run server
npm run prod
```

This command:
1. Builds all TypeScript packages via Turbo (`turbo build`)
2. Builds web client and copies to `server/client-dist/` (`npm run build:client`)
3. Starts Express server in production mode (`cd packages/server && npm run start:prod`)

### Individual Build Steps
```bash
# Build all packages only
npm run build

# Build client distribution only
npm run build:client

# Start server in production mode (after building)
cd packages/server && npm run start:prod
```

## Production Server Behavior

When `NODE_ENV=production`, the Express server:

- **Serves static files** from `packages/server/client-dist/`
- **API routes** available under `/api/*` prefix
- **SPA fallback** - All non-API routes serve `index.html` (for React Router)
- **No CORS headers** - Client and API served from same origin
- **Health check** - `GET /health` returns server status

## Environment Variables

Required in `.env`:

```env
NODE_ENV=production
API_PORT=3000
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
```

## Deployment

### Single Server Deployment

```bash
# 1. Clone repository
git clone <repo-url>
cd bonchi_v2

# 2. Install dependencies
npm install

# 3. Set environment variables
cp .env.example .env
# Edit .env with production values

# 4. Run database migrations
cd packages/server
npm run prisma:migrate

# 5. Build and start
cd ../..
npm run prod
```

Server will be available at `http://localhost:3000` (or your configured port).

### Docker Deployment

See `Dockerfile.server` and `docker-compose.prod.yml` for containerized deployment.

### PM2 Deployment

```bash
# Build first
npm run build && npm run build:client

# Start with PM2
pm2 start packages/server/dist/index.js --name bonchi-prod

# Or use ecosystem config
npm run pm2:prod
```

## File Structure

```
packages/
├── server/
│   ├── dist/              # Compiled server code
│   ├── client-dist/       # Built web client (production)
│   └── src/
│       └── index.ts       # Express server with static serving
├── web/
│   └── dist/              # Vite build output (copied to server)
└── shared/
    └── dist/              # Compiled shared utilities
```

## Troubleshooting

### Build fails
```bash
# Clean all build artifacts
npm run clean  # If script exists
rm -rf packages/*/dist packages/server/client-dist

# Rebuild
npm install
npm run build
npm run build:client
```

### Server can't find static files
- Ensure `client-dist/` exists in `packages/server/`
- Check `NODE_ENV=production` is set
- Verify build completed successfully

### API routes not working
- Ensure API routes are defined BEFORE static file middleware
- API routes should use `/api/*` prefix
- Check server logs for errors

## Development vs Production

| Aspect | Development | Production |
|--------|------------|------------|
| Web Server | Vite dev server (port 5173) | Express static (same port as API) |
| API Server | Express (port 3000) | Express (port 3000) |
| CORS | Enabled for cross-origin | Disabled (same origin) |
| Hot Reload | Yes | No |
| Build | On-demand | Pre-compiled |

## Scripts Reference

### Root (`package.json`)
- `npm run build` - Build all packages via Turbo
- `npm run build:client` - Build web and copy to server/client-dist
- `npm run dev` - Run all packages in dev mode
- `npm run prod` - Full production build and start server

### Server (`packages/server/package.json`)
- `npm run build` - Compile TypeScript to dist/
- `npm run start` - Run compiled server (any environment)
- `npm run start:prod` - Run with NODE_ENV=production
- `npm run dev` - Run with tsx watch (dev mode)

### Web (`packages/web/package.json`)
- `npm run build` - Vite production build to dist/
- `npm run dev` - Vite dev server
- `npm run preview` - Preview production build locally
