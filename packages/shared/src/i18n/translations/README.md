# Translation Files Structure

## 📁 File Organization

The translations are now organized in separate files for better maintainability:

```
packages/shared/src/i18n/translations/
├── types.ts          # TranslationKeys type definition
├── en.ts             # English translations
├── hi.ts             # Hindi translations
├── ta.ts             # Tamil translations
├── te.ts             # Telugu translations
├── bn.ts             # Bengali translations
├── mr.ts             # Marathi translations
├── gu.ts             # Gujarati translations
├── kn.ts             # Kannada translations
├── common.ts         # Combines all translations
└── index.ts          # Export barrel file
```

## 🎯 Benefits

### 1. **Easy Maintenance**
Each language has its own file, making it easier to:
- Update translations for a specific language
- Find and fix translation issues
- Review changes in PRs

### 2. **Better Collaboration**
Multiple translators can work on different language files simultaneously without merge conflicts.

### 3. **Type Safety**
The `types.ts` file ensures all languages have the same keys, preventing missing translations.

### 4. **Scalability**
Easy to add new languages - just create a new file and import it in `common.ts`.

## 📝 Usage

### Import Translations (Recommended)
```typescript
import { commonTranslations, TranslationKeys } from '@bonchi/shared';
```

### Import Specific Language (Optional)
```typescript
import { en, hi, ta } from '@bonchi/shared';
```

### Import Types Only
```typescript
import type { TranslationKeys } from '@bonchi/shared';
```

## ➕ Adding New Translation Keys

### Step 1: Update `types.ts`
```typescript
// packages/shared/src/i18n/translations/types.ts
export type TranslationKeys = {
  // ... existing keys
  'feature.newKey': string;
};
```

### Step 2: Update Each Language File
Update all 8 language files (en.ts, hi.ts, ta.ts, etc.):

```typescript
// packages/shared/src/i18n/translations/en.ts
export const en: TranslationKeys = {
  // ... existing translations
  'feature.newKey': 'New Feature',
};
```

TypeScript will show errors if you miss any language!

## 🌍 Adding a New Language

### Step 1: Create Language File
```typescript
// packages/shared/src/i18n/translations/pa.ts
import type { TranslationKeys } from './types';

export const pa: TranslationKeys = {
  'common.submit': 'ਜਮ੍ਹਾਂ ਕਰੋ',
  // ... all other keys
};
```

### Step 2: Update `common.ts`
```typescript
import { pa } from './pa';

export const commonTranslations: Record<LanguageCode, TranslationKeys> = {
  en, hi, ta, te, bn, mr, gu, kn,
  pa, // Add new language
};
```

### Step 3: Update `index.ts`
```typescript
export { pa } from './pa';
```

### Step 4: Update Language Config
```typescript
// packages/shared/src/i18n/config.ts
export type LanguageCode = 'en' | 'hi' | 'ta' | 'te' | 'bn' | 'mr' | 'gu' | 'kn' | 'pa';

export const languages: Record<LanguageCode, Language> = {
  // ... existing languages
  pa: {
    code: 'pa',
    name: 'Punjabi',
    nativeName: 'ਪੰਜਾਬੀ',
    direction: 'ltr',
    enabled: true,
  },
};
```

## 🔍 Finding Translations

### By Key
Search across all files for a specific key:
```bash
grep -r "common.submit" packages/shared/src/i18n/translations/
```

### By Language
Open the specific language file:
- English: `en.ts`
- Hindi: `hi.ts`
- Tamil: `ta.ts`
- etc.

## ✅ Type Checking

TypeScript ensures type safety:

### Missing Keys
```typescript
// ❌ Error: Property 'common.submit' is missing
export const hi: TranslationKeys = {
  'common.cancel': 'रद्द करें',
  // Missing other keys...
};
```

### Extra Keys
```typescript
// ❌ Error: 'invalidKey' does not exist in type 'TranslationKeys'
export const hi: TranslationKeys = {
  'common.submit': 'सबमिट करें',
  'invalidKey': 'some value',
};
```

### Correct Usage
```typescript
// ✅ All keys present and valid
export const hi: TranslationKeys = {
  'common.submit': 'सबमिट करें',
  'common.cancel': 'रद्द करें',
  // ... all other required keys
};
```

## 📊 Current Statistics

- **Languages**: 8 (EN, HI, TA, TE, BN, MR, GU, KN)
- **Translation Keys**: 35
- **Total Translations**: 280 (35 keys × 8 languages)
- **Files**: 11 (1 types + 8 languages + 1 common + 1 index)

## 🎨 File Responsibilities

### `types.ts`
- Defines all translation key types
- Ensures type safety across all languages
- Single source of truth for translation structure

### Language Files (en.ts, hi.ts, etc.)
- Contains translations for a specific language
- Implements TranslationKeys interface
- Independent and self-contained

### `common.ts`
- Combines all language translations
- Exports the main `commonTranslations` object
- Re-exports TranslationKeys type

### `index.ts`
- Barrel export file
- Exports all translations and types
- Optional: Exports individual language objects

## 💡 Best Practices

1. **Always update `types.ts` first** when adding new keys
2. **Update all language files** before committing
3. **Keep translations in sync** - TypeScript helps with this
4. **Use descriptive comments** for complex translations
5. **Test in at least 2 languages** after adding new keys
6. **Review native speakers** for quality translations

## 🔄 Migration Benefits

### Before (Single File)
```
common.ts (850+ lines)
├── Types (50 lines)
├── English (100 lines)
├── Hindi (100 lines)
├── Tamil (100 lines)
├── Telugu (100 lines)
├── Bengali (100 lines)
├── Marathi (100 lines)
├── Gujarati (100 lines)
└── Kannada (100 lines)
```

### After (Multiple Files)
```
types.ts (50 lines)          ← Easy to find and update
en.ts (50 lines)             ← Focus on one language
hi.ts (50 lines)             ← No scrolling through 850 lines
ta.ts (50 lines)             ← Cleaner git diffs
te.ts (50 lines)             ← Better collaboration
bn.ts (50 lines)             ← Less merge conflicts
mr.ts (50 lines)             ← Easier code reviews
gu.ts (50 lines)             ← More maintainable
kn.ts (50 lines)
common.ts (30 lines)         ← Just imports
index.ts (20 lines)          ← Exports
```

## 🎯 Summary

The new structure:
- ✅ Makes maintenance easier
- ✅ Improves collaboration
- ✅ Reduces merge conflicts
- ✅ Maintains type safety
- ✅ Scales well with more languages
- ✅ Cleaner git history
- ✅ Better code organization

**The API remains the same - no changes needed in consuming code!**
