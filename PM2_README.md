# PM2 Configuration for Bonchi V2

This monorepo uses PM2 to manage multiple Node.js/Bun processes in development and production.

## Prerequisites

Install PM2 globally:
```bash
npm install -g pm2
```

## Available Commands

### Development Mode
Start only development services (server-dev + web-dev):
```bash
npm run pm2:dev
```
This runs:
- **bonchi-server-dev**: Bun server with hot reload (`bun run dev`)
- **bonchi-web-dev**: Vite dev server (`npm run dev`)

### Production Mode
Build and start production services:
```bash
npm run pm2:prod
```
This runs:
1. Builds all packages (`turbo build`)
2. Starts:
   - **bonchi-server**: Built server with Bun (`bun run start`)
   - **bonchi-web-preview**: Vite preview server (`npm run preview`)

### All Services
Start all configured services:
```bash
npm run pm2:all
```

### Management Commands

**View logs:**
```bash
npm run pm2:logs          # All logs (live tail)
pm2 logs bonchi-server    # Specific service logs
pm2 logs --lines 100      # Last 100 lines
```

**Monitor resources:**
```bash
npm run pm2:monit         # Interactive monitoring dashboard
```

**Check status:**
```bash
npm run pm2:status        # Show all running processes
```

**Stop services:**
```bash
npm run pm2:stop          # Stop all services
pm2 stop bonchi-server    # Stop specific service
```

**Restart services:**
```bash
npm run pm2:restart       # Restart all services
pm2 restart bonchi-server # Restart specific service
```

**Delete from PM2:**
```bash
npm run pm2:delete        # Remove all from PM2 process list
```

## Available Processes

| Process Name | Description | Command | Port |
|-------------|-------------|---------|------|
| `bonchi-server` | Production server (built) | `bun run start` | Check .env |
| `bonchi-server-dev` | Development server (hot reload) | `bun run dev` | Check .env |
| `bonchi-web-dev` | Vite dev server | `npm run dev` | 5173 |
| `bonchi-web-preview` | Vite production preview | `npm run preview` | 4173 |

## Log Files

Logs are stored in `./logs/` directory:
- `server-error.log` / `server-out.log` - Production server logs
- `server-dev-error.log` / `server-dev-out.log` - Development server logs
- `web-dev-error.log` / `web-dev-out.log` - Web dev server logs
- `web-preview-error.log` / `web-preview-out.log` - Web preview logs

## Advanced PM2 Commands

**Save current process list (auto-restart on reboot):**
```bash
pm2 save
pm2 startup  # Generate startup script
```

**Flush logs:**
```bash
pm2 flush  # Clear all log files
```

**Reload with zero-downtime:**
```bash
pm2 reload ecosystem.config.cjs
```

**Environment-specific startup:**
```bash
pm2 start ecosystem.config.cjs --env production
pm2 start ecosystem.config.cjs --env development
```

## Configuration

Edit `ecosystem.config.cjs` to:
- Adjust memory limits (`max_memory_restart`)
- Change instance counts (for clustering)
- Modify environment variables
- Configure watch mode
- Set up cron restarts

## Troubleshooting

**If services won't start:**
1. Check if ports are available
2. Verify `.env` file exists with required variables
3. Check logs: `npm run pm2:logs`
4. Ensure dependencies are installed: `npm install`

**Build before production:**
```bash
npm run build  # Build all packages
cd packages/server && bun run prisma:generate  # Generate Prisma client
```

**Clean restart:**
```bash
npm run pm2:delete  # Remove all processes
npm run pm2:dev     # Start fresh
```

## Notes

- The server uses **Bun runtime** (not Node.js)
- Web package uses standard Node.js/npm
- PM2 is configured with `interpreter: 'none'` for Bun processes
- Development mode uses watch mode built into the tools (not PM2 watch)
- Production mode requires building first
