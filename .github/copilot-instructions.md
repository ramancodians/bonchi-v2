# Bonchi V2 - AI Coding Agent Instructions

## Project Architecture

**Turborepo monorepo** with three packages:

- `packages/shared` - Shared utilities, types, i18n, auth hooks (consumed by both server & web)
- `packages/server` - Bun + Express API with Prisma ORM (PostgreSQL)
- `packages/web` - Vite + React SPA with TailwindCSS + DaisyUI

**Critical**: Changes to `shared` require consumers (server/web) to pick them up automatically via workspace linking (`"@bonchi/shared": "*"`).

## Development Workflow

```bash
# Root: Run all packages in dev mode (parallel)
npm run dev

# Server: Bun runtime with hot reload
cd packages/server && bun run dev

# Web: Vite dev server
cd packages/web && npm run dev

# Database migrations (always from server package)
cd packages/server
bun run prisma:migrate  # Create & apply migration
bun run prisma:generate # Regenerate Prisma Client
bun run prisma:studio   # Visual DB browser
```

**After Prisma schema changes**: Always run `prisma:generate` to update TypeScript types.

## Internationalization (i18n) - CRITICAL CONVENTION

**All UI text MUST use translations** - never hardcode strings. The app supports 8 Indian languages (en, hi, ta, te, bn, mr, gu, kn).

### Pattern for React Components

```tsx
import { useI18n } from '@bonchi/shared';

function MyComponent() {
  const { t } = useI18n(); // NOT useTranslation()
  return <button>{t('common.submit')}</button>;
}
```

### Adding New Translation Keys

1. Add key to `packages/shared/src/i18n/translations/types.ts` (TranslationKeys type)
2. Add translations in `packages/shared/src/i18n/translations/[lang].ts` for ALL languages
3. Use via `t('your.new.key')`

**Import pattern**: `import { useI18n } from '@bonchi/shared'` (not from `@bonchi/shared/i18n`)

## Authentication System

**Dual authentication**: Email/Password + SMS OTP (Fast2SMS)

- JWT tokens (7-day expiry) stored in localStorage
- Prisma models: `User` (with `authType` enum), `OtpSession`
- API routes: `/api/auth/*` in `packages/server/src/routes/auth.routes.ts`

### Frontend Auth Hooks

```tsx
import { useEmailAuth, useOTPAuth, useAuth } from '@bonchi/shared';

// Email login/register
const { login, register, loading, error } = useEmailAuth();

// SMS OTP flow
const { sendOTP, verifyOTP, loading, sessionId } = useOTPAuth();

// Current auth state
const { user, isAuthenticated, logout } = useAuth();
```

**Token management**: `authUtils.setAuthData()` auto-sets axios Authorization header.

## Assets Management

**Import pattern**: `import { BonchiLogo, LoginBackground } from '@bonchi/shared/assets'`

Add new assets:

1. Place file in `packages/shared/src/assets/files/images/`
2. Export from `packages/shared/src/assets/files/images/index.ts`
3. Re-export from `packages/shared/src/assets/index.ts`

## Forms - Use TanStack (React Query)

**CRITICAL**: Always use `@tanstack/react-query` for forms with API calls, NOT plain state + fetch.

```tsx
import { useMutation } from '@tanstack/react-query';

const mutation = useMutation({
  mutationFn: (data) => apiClient.post('/endpoint', data),
  onSuccess: () => {
    /* handle success */
  },
});
```

## API Client Pattern

**All API calls** go through `apiClient` from shared package:

```tsx
import { apiClient } from '@bonchi/shared';

// apiClient already configured with baseURL and auth headers
const response = await apiClient.post('/api/endpoint', data);
```

## Database Patterns

**Prisma ORM** - always import from generated client:

```typescript
import { PrismaClient, AuthType } from '@prisma/client';
```

**Critical relations**:

- User.otpSessions (one-to-many)
- User.authType (enum: EMAIL_PASSWORD | SMS_OTP)

## Environment Variables

**Location**: Root `.env` file (shared by all packages)
**Required**: `DATABASE_URL`, `JWT_SECRET`, `FAST2SMS_API_KEY`, `API_PORT`, `VITE_API_URL`

Web package uses `VITE_` prefix for client-accessible vars.

## Component Structure

**Web package pages**: `packages/web/src/pages/`
**Shared components**: Use `@/components/` alias in web package

**Layout pattern**: Pages use `<Layout>` or bare structure, all include `<AppFooter />`

## UI Components - DaisyUI ONLY

**CRITICAL**: All UI components MUST use DaisyUI components - never use plain HTML elements or custom components for UI.

### DaisyUI Component Usage
```tsx
// ✅ CORRECT - Use DaisyUI components
<button className="btn btn-primary">Submit</button>
<input type="text" className="input input-bordered" />
<div className="card bg-base-100 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">Title</h2>
  </div>
</div>

// ❌ WRONG - Don't use plain elements or custom styling
<button className="bg-blue-500 px-4 py-2">Submit</button>
<input className="border rounded px-2" />
```

### Common DaisyUI Components
- **Buttons**: `btn`, `btn-primary`, `btn-secondary`, `btn-accent`, `btn-ghost`, `btn-link`
- **Inputs**: `input`, `input-bordered`, `input-primary`, `textarea`
- **Forms**: `form-control`, `label`, `label-text`, `input-group`
- **Cards**: `card`, `card-body`, `card-title`, `card-actions`
- **Alerts**: `alert`, `alert-info`, `alert-success`, `alert-warning`, `alert-error`
- **Modals**: `modal`, `modal-box`, `modal-action`
- **Navigation**: `navbar`, `menu`, `tabs`, `breadcrumbs`
- **Loading**: `loading`, `loading-spinner`, `loading-dots`

**Documentation**: https://daisyui.com/components/

### Responsive Design
Use Tailwind utility classes ONLY for:
- Layout (flex, grid, spacing)
- Responsive breakpoints (sm:, md:, lg:)
- Custom positioning/sizing

All visual components (buttons, inputs, cards, etc.) must use DaisyUI classes.

## Key Documentation Files

- `AUTH_README.md` - Authentication API & usage
- `I18N_QUICKSTART.md` - i18n quick reference
- `ENV.md` - Environment variable reference
- `packages/shared/I18N_GUIDE.md` - Detailed i18n integration

## Common Gotchas

1. **i18n**: Never use `useTranslation()` - always `useI18n()`
2. **Assets**: Import from `'@bonchi/shared/assets'` not `'@bonchi/shared'`
3. **Prisma**: Run generate after ANY schema change
4. **Auth**: Token auto-included in apiClient headers after login
5. **Forms**: Use TanStack Query mutations, not raw fetch/axios
6. **UI Text**: ALL user-facing strings must use `t()` translations
7. **UI Components**: ONLY use DaisyUI components - never plain HTML with Tailwind utility classes for buttons, inputs, cards, etc.
