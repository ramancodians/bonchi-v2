# GitHub Variables and Secrets Setup

This document lists all the variables and secrets you need to configure in your GitHub repository for CI/CD to work properly.

## How to Add Variables and Secrets

### Repository Variables
1. Go to your GitHub repository
2. Navigate to **Settings → Secrets and variables → Actions**
3. Click the **Variables** tab
4. Click **New repository variable**

### Repository Secrets
1. Go to your GitHub repository
2. Navigate to **Settings → Secrets and variables → Actions**
3. Click the **Secrets** tab
4. Click **New repository secret**

---

## Required Variables

### `CI_DATABASE_URL` (Optional)
- **Type**: Variable
- **Description**: Database URL for Prisma Client generation during CI builds
- **Default**: `postgresql://dummy:dummy@localhost:5432/dummy?schema=public`
- **Example**: `postgresql://user:password@localhost:5432/bonchi_ci?schema=public`
- **Note**: This is only used for generating Prisma Client types, not for actual database connections

### `VITE_API_URL` (Optional)
- **Type**: Variable
- **Description**: API URL that will be baked into the web application build
- **Default**: `http://localhost:4001`
- **Production Example**: `https://api.yourdomain.com`
- **Staging Example**: `https://api-staging.yourdomain.com`
- **Note**: This value is embedded in the built JavaScript files

### `DEPLOY_PATH` (Optional)
- **Type**: Variable
- **Description**: Path on the deployment server where the application is located
- **Default**: `/home/ubuntu/bonchi_v2`
- **Example**: `/var/www/bonchi_v2` or `/opt/apps/bonchi_v2`

---

## Required Secrets (Only for Deployment)

### `DEPLOY_HOST` (Required for SSH deployment)
- **Type**: Secret
- **Description**: IP address or domain name of your deployment server
- **Example**: `123.45.67.89` or `server.yourdomain.com`

### `DEPLOY_USER` (Required for SSH deployment)
- **Type**: Secret
- **Description**: SSH username for deployment
- **Example**: `ubuntu`, `root`, or your server username

### `DEPLOY_SSH_KEY` (Required for SSH deployment)
- **Type**: Secret
- **Description**: Private SSH key for authentication
- **How to generate**:
  ```bash
  ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/bonchi_deploy
  ```
- **Value**: Copy the entire content of the private key file:
  ```bash
  cat ~/.ssh/bonchi_deploy
  ```
  Include everything from `-----BEGIN OPENSSH PRIVATE KEY-----` to `-----END OPENSSH PRIVATE KEY-----`
- **Note**: Add the corresponding public key to your server's `~/.ssh/authorized_keys`

---

## Automatic Secrets (Provided by GitHub)

### `GITHUB_TOKEN`
- **Type**: Automatic Secret
- **Description**: Automatically provided by GitHub Actions
- **Used for**: Pushing Docker images to GitHub Container Registry
- **No action needed** - GitHub provides this automatically

---

## Summary Table

| Name | Type | Required | Default | Purpose |
|------|------|----------|---------|---------|
| `CI_DATABASE_URL` | Variable | No | `postgresql://dummy:dummy@localhost:5432/dummy?schema=public` | Prisma generation in CI |
| `VITE_API_URL` | Variable | No | `http://localhost:4001` | API URL in web build |
| `DEPLOY_PATH` | Variable | No | `/home/ubuntu/bonchi_v2` | Deployment directory path |
| `DEPLOY_HOST` | Secret | For deployment | - | Server IP/domain |
| `DEPLOY_USER` | Secret | For deployment | - | SSH username |
| `DEPLOY_SSH_KEY` | Secret | For deployment | - | SSH private key |
| `GITHUB_TOKEN` | Auto | Always | Auto-provided | GHCR authentication |

---

## Recommended Setup

### Minimum Setup (CI/CD without deployment)
No variables needed - everything uses defaults. Your CI will build and push images automatically.

### Production Setup
Create these variables:
```
Variables:
- VITE_API_URL = https://api.yourdomain.com
- CI_DATABASE_URL = (can use default)
- DEPLOY_PATH = /home/ubuntu/bonchi_v2

Secrets:
- DEPLOY_HOST = your-server-ip
- DEPLOY_USER = ubuntu
- DEPLOY_SSH_KEY = your-private-key
```

### Multi-Environment Setup
You can create environment-specific variables:
1. Go to **Settings → Environments**
2. Create environments: `production`, `staging`
3. Add environment-specific variables to each

Example:
- **Production Environment**:
  - `VITE_API_URL` = `https://api.yourdomain.com`
  - `DEPLOY_HOST` = `prod-server-ip`
  
- **Staging Environment**:
  - `VITE_API_URL` = `https://api-staging.yourdomain.com`
  - `DEPLOY_HOST` = `staging-server-ip`

---

## Testing Your Setup

After adding variables, test by:

1. **Push to GitHub**: Triggers CI/CD workflows
2. **Check Actions tab**: View workflow runs
3. **Verify builds**: Check that Docker images are created
4. **Test deployment**: Use manual deployment workflow

---

## Troubleshooting

### CI fails with "Cannot resolve environment variable"
- Add `CI_DATABASE_URL` variable (or use default)

### Web app can't connect to API
- Check `VITE_API_URL` is set correctly
- Remember: This is baked into the build, not runtime

### SSH deployment fails
- Verify `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_SSH_KEY` are set
- Test SSH connection manually: `ssh -i ~/.ssh/bonchi_deploy user@host`
- Ensure public key is in server's `~/.ssh/authorized_keys`

### Docker images have wrong API URL
- Update `VITE_API_URL` variable
- Rebuild images (push to main branch)
