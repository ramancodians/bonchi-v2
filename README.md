# Bonchi V2 - Turborepo Monorepo

A monorepo built with Turborepo containing shared utilities, a web application, and a backend server with **multi-language support for 8 major Indian languages**.

## 🌐 Multi-Language Support

This project includes a complete internationalization (i18n) infrastructure supporting:
- ✅ English, Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada
- ✅ Type-safe translations with TypeScript
- ✅ Number, currency, and date formatting
- ✅ React hooks and Context API
- ✅ Server-side translation support

**Quick Start:** See [I18N_QUICKSTART.md](./I18N_QUICKSTART.md)
**Full Documentation:** See [I18N_README.md](./I18N_README.md)

## Structure

```
bonchi_v2/
├── packages/
│   ├── shared/          # Shared utilities and functions
│   ├── server/          # Bun + Express API server
│   └── web/             # Vite + React web application
├── package.json         # Root package.json with workspaces
├── turbo.json          # Turborepo configuration
└── tsconfig.json       # Base TypeScript configuration
```

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

Run all packages in development mode:

```bash
npm run dev
```

### Build

Build all packages:

```bash
npm run build
```

### Lint

Lint all packages:

```bash
npm run lint
```

## Packages

### @bonchi/shared

A shared library containing common utilities, functions, and **internationalization (i18n) infrastructure** that can be used across other packages.

**Location:** `packages/shared`

**Features:**
- Common utility functions
- API client configuration
- React hooks
- **i18n support for 8 Indian languages**
- Type-safe translations
- Currency, number, and date formatting

**Usage:**
```typescript
// Utilities

// i18n
import { useTranslation, formatCurrency } from '@bonchi/shared';

function MyComponent() {
  const { t, language } = useTranslation();
  return (
    <div>
      <h1>{t('common.welcome')}</h1>
      <p>{formatCurrency(5000, language, 'INR')}</p>
    </div>
  );
}
```

**i18n Documentation:** See `packages/shared/I18N_GUIDE.md`

### @bonchi/server

A Bun-powered Express API server that uses the shared package.

**Location:** `packages/server`

**Run:**
```bash
cd packages/server
bun run dev
```

**Endpoints:**
- `GET /add/:a/:b` - Adds two numbers
- `GET /health` - Health check endpoint

The server runs on http://localhost:3000

### @bonchi/web

A Vite + React web application that uses the shared package.

**Location:** `packages/web`
Vite** - Fast frontend build tool
- **React** - UI library
- **
**Run:**
```bash
cd packages/web
npm run dev
```

The app will be available at http://localhost:5173

## Tech Stack

- **Turborepo** - Monorepo build system
- **TypeScript** - Type-safe JavaScript
- **Bun** - Fast JavaScript runtime
- **Express** - API server framework
- **Vite** - Fast frontend build tool
- **React** - UI library
- **Prettier** - Code formatting
- **i18n** - Multi-language support (8 Indian languages)
- **React Context** - State management for language
- **Intl API** - Native browser internationalization

## 📚 Documentation

- [i18n Quick Start](./I18N_QUICKSTART.md) - Get started with multi-language support
- [i18n Complete Guide](./I18N_README.md) - Full documentation
- [i18n Integration Guide](./packages/shared/I18N_GUIDE.md) - Detailed integration
- [i18n Migration Guide](./I18N_MIGRATION_GUIDE.md) - Update existing components
- [Implementation Summary](./I18N_IMPLEMENTATION_SUMMARY.md) - What was built
