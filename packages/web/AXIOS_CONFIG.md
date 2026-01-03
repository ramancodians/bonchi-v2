# Axios Configuration

The `apiClient` is configured in the **web package** and initialized with the shared auth and API modules.

## Location

- **Web Package**: `packages/web/src/config/axiosConfig.ts`

## Environment Variables

Create a `.env` file in `packages/web/` with:

```env
VITE_API_URL=http://localhost:3000
```

## Initialization

The `apiClient` is initialized in `main.tsx`:

```typescript
import { apiClient } from './config/axiosConfig'
import { initializeAuth, initializeApi } from '@bonchi/shared'

// Initialize shared modules with apiClient
initializeAuth(apiClient);
initializeApi(apiClient);
```

This pattern allows the shared package to be framework-agnostic while the web package provides the actual HTTP client implementation.

## Usage

All authentication and API hooks from `@bonchi/shared` will automatically use the initialized `apiClient`:

```typescript
import { useEmailAuth, usePackages } from '@bonchi/shared';

// These hooks use the apiClient under the hood
const { login, register } = useEmailAuth();
const { data: packages } = usePackages();
```

## Configuration

The `apiClient` is configured with:
- Base URL from `VITE_API_URL` environment variable
- 10 second timeout
- JSON content-type headers
- Request/response interceptors for error handling
- Automatic auth token injection (via `authUtils.setAuthData()`)
