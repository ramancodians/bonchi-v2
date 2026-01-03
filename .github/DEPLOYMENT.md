# Deployment Guide

## GitHub Container Registry

Images are automatically built and pushed to GitHub Container Registry (GHCR) on push to main branch.

### Image URLs
- **Server**: `ghcr.io/ramancodians/bonchi-v2-server:latest`
- **Web**: `ghcr.io/ramancodians/bonchi-v2-web:latest`

## Automated Workflows

### CI Pipeline (`.github/workflows/ci.yml`)
Runs on every push and PR:
- Linting and type checking
- Build all packages
- Run tests
- Security scanning
- Docker build test

### Docker Build (`.github/workflows/docker-build.yml`)
Builds and pushes Docker images:
- **Triggers**: Push to main/master/develop, tags, PRs
- **Images**: Builds both server and web
- **Registry**: GitHub Container Registry (ghcr.io)
- **Tags**: 
  - `latest` (default branch)
  - Branch name (e.g., `develop`)
  - PR number (e.g., `pr-123`)
  - Git SHA (e.g., `main-abc1234`)
  - Semantic versions (e.g., `v1.0.0`, `1.0`)

### Deploy (`.github/workflows/deploy.yml`)
Manual deployment workflow:
- Triggered via GitHub Actions UI
- Choose environment (production/staging)
- Specify image tag (default: latest)

## Local Development

```bash
# Build locally
docker-compose build

# Start services
docker-compose up -d

# View logs
docker-compose logs -f
```

## Production Deployment

### Option 1: Using Pre-built Images

```bash
# Pull latest images from GHCR
docker pull ghcr.io/ramancodians/bonchi-v2-server:latest
docker pull ghcr.io/ramancodians/bonchi-v2-web:latest

# Deploy using production compose file
docker-compose -f docker-compose.prod.yml up -d

# Run migrations
docker-compose exec server npm run prisma:migrate
```

### Option 2: Build on Server

```bash
# Build and deploy
docker-compose up -d --build

# Run migrations
docker-compose exec server npm run prisma:migrate
```

## Server Setup

### 1. Install Docker and Docker Compose

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 2. Clone Repository

```bash
git clone https://github.com/ramancodians/bonchi-v2.git
cd bonchi-v2
```

### 3. Configure Environment

```bash
# Copy environment template
cp .env.docker .env

# Edit environment variables
nano .env
```

Required variables:
- `POSTGRES_PASSWORD` - Database password
- `JWT_SECRET` - JWT signing secret (min 32 chars)
- `FAST2SMS_API_KEY` - SMS API key
- `VITE_API_URL` - API URL (e.g., https://api.yourdomain.com)

### 4. Deploy

```bash
# Login to GitHub Container Registry
echo $GITHUB_TOKEN | docker login ghcr.io -u ramancodians --password-stdin

# Pull and start services
docker-compose -f docker-compose.prod.yml pull
docker-compose -f docker-compose.prod.yml up -d

# Run database migrations
docker-compose exec server npm run prisma:migrate

# Check status
docker-compose ps
docker-compose logs -f
```

## Monitoring

### Health Checks

- **API Health**: http://your-domain:4001/health
- **Web Health**: http://your-domain:4000/health

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f server
docker-compose logs -f web
docker-compose logs -f db
```

### Container Stats

```bash
docker stats bonchi-server bonchi-web bonchi-postgres
```

## Updates

### Manual Update

```bash
# Pull latest images
docker-compose -f docker-compose.prod.yml pull

# Restart services
docker-compose -f docker-compose.prod.yml up -d

# Run any new migrations
docker-compose exec server npm run prisma:migrate
```

### Automated Update Script

Create `update.sh`:

```bash
#!/bin/bash
set -e

echo "🔄 Updating Bonchi V2..."

# Pull latest code (if using git)
# git pull

# Pull latest images
echo "📦 Pulling latest images..."
docker-compose -f docker-compose.prod.yml pull

# Restart services
echo "🔄 Restarting services..."
docker-compose -f docker-compose.prod.yml up -d

# Run migrations
echo "🗄️ Running database migrations..."
docker-compose exec -T server npm run prisma:migrate

# Check status
echo "✅ Update complete!"
docker-compose ps
```

Make it executable:
```bash
chmod +x update.sh
./update.sh
```

## Backup

### Database Backup

```bash
# Backup database
docker-compose exec -T db pg_dump -U bonchi bonchi_db > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore database
docker-compose exec -T db psql -U bonchi bonchi_db < backup.sql
```

### Automated Backup (Cron)

Add to crontab (`crontab -e`):

```bash
# Daily backup at 2 AM
0 2 * * * cd /path/to/bonchi_v2 && docker-compose exec -T db pg_dump -U bonchi bonchi_db > /backups/bonchi_$(date +\%Y\%m\%d).sql

# Keep only last 7 days
0 3 * * * find /backups -name "bonchi_*.sql" -mtime +7 -delete
```

## Troubleshooting

### Images Not Found

If you get "image not found" errors:

```bash
# Make images public in GitHub
# Go to: https://github.com/users/ramancodians/packages/container/bonchi-v2-server/settings
# Change visibility to public

# Or authenticate with token
echo $GITHUB_TOKEN | docker login ghcr.io -u ramancodians --password-stdin
```

### Migration Errors

```bash
# Check migration status
docker-compose exec server npm run prisma:migrate status

# Reset database (CAUTION: deletes all data)
docker-compose exec server npm run prisma:migrate reset
```

### Container Won't Start

```bash
# Check logs
docker-compose logs server

# Check environment
docker-compose exec server env

# Restart specific service
docker-compose restart server
```

## Nginx Reverse Proxy (Optional)

If deploying with Nginx:

```nginx
# /etc/nginx/sites-available/bonchi

server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:4001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable and restart:
```bash
sudo ln -s /etc/nginx/sites-available/bonchi /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## SSL with Certbot

```bash
sudo certbot --nginx -d yourdomain.com -d api.yourdomain.com
```
