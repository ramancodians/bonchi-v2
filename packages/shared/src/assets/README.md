# 🎨 Assets Module Documentation

Complete guide for managing and using assets in the Bonchi shared package.

## 📁 Directory Structure

```
packages/shared/src/assets/
├── asset-types.d.ts     # TypeScript declarations for asset files
├── constants.ts         # Asset-related constants
├── utils.ts            # Asset utility functions
├── index.ts            # Main export file
└── files/              # Actual asset files
    ├── images/         # Images (PNG, JPG, SVG, WebP, etc.)
    ├── icons/          # Icon files
    ├── fonts/          # Custom fonts
    ├── styles/         # Shared CSS files
    ├── videos/         # Video files
    ├── audio/          # Audio files
    └── documents/      # PDF and other documents
```

## 🚀 Quick Start

### 1. Add Your Assets

Place your files in the appropriate subdirectory:

```bash
packages/shared/src/assets/files/images/logo.png
packages/shared/src/assets/files/icons/home.svg
packages/shared/src/assets/files/styles/global.css
```

### 2. Export Assets

Edit `files/index.ts`:

```typescript
// Export your images
export { default as Logo } from './images/logo.png';
export { default as Banner } from './images/banner.jpg';

// Export your icons
export { default as HomeIcon } from './icons/home.svg';
export { default as UserIcon } from './icons/user.svg';
```

### 3. Use in Your App

```typescript
import { Logo, HomeIcon } from '@bonchi/shared/assets';
import { preloadImage, getAssetUrl } from '@bonchi/shared/assets';

function MyComponent() {
  return (
    <div>
      <img src={Logo} alt="Bonchi Logo" />
      <img src={HomeIcon} alt="Home" />
    </div>
  );
}
```

## 📦 Supported File Types

### Images
- `.png`, `.jpg`, `.jpeg` - Raster images
- `.svg` - Vector graphics
- `.gif` - Animated images
- `.webp` - Modern image format
- `.ico` - Favicons

### Styles
- `.css` - Stylesheets
- `.scss`, `.sass` - Sass stylesheets
- `.less` - Less stylesheets

### Fonts
- `.woff`, `.woff2` - Web fonts (recommended)
- `.ttf`, `.otf` - TrueType/OpenType fonts
- `.eot` - Embedded OpenType

### Media
- `.mp4`, `.webm`, `.ogg` - Videos
- `.mp3`, `.wav`, `.flac` - Audio

### Documents
- `.pdf` - PDF documents
- `.txt`, `.md` - Text files
- `.json`, `.yaml`, `.toml` - Data files

## 🛠️ Utility Functions

### Image Utilities

```typescript
import { 
  preloadImage, 
  preloadImages, 
  getResponsiveSrcSet 
} from '@bonchi/shared/assets';

// Preload a single image
await preloadImage('/path/to/image.jpg');

// Preload multiple images
await preloadImages([
  '/image1.jpg',
  '/image2.jpg',
  '/image3.jpg'
]);

// Generate responsive srcSet
const srcSet = getResponsiveSrcSet(
  '/images/banner.jpg',
  [480, 768, 1024, 1920]
);
// Returns: "/images/banner@480w.jpg 480w, /images/banner@768w.jpg 768w, ..."
```

### Asset Type Checking

```typescript
import { 
  isImage, 
  isVideo, 
  isAudio, 
  isFont, 
  isStyle,
  getMimeType,
  formatFileSize
} from '@bonchi/shared/assets';

isImage('photo.jpg');        // true
isVideo('video.mp4');        // true
getMimeType('logo.png');     // 'image/png'
formatFileSize(1024 * 500);  // '500 KB'
```

### Asset URL Generation

```typescript
import { getAssetUrl } from '@bonchi/shared/assets';

// With base URL
const url = getAssetUrl('/images/logo.png', 'https://cdn.example.com');
// Returns: 'https://cdn.example.com/images/logo.png'

// Without base URL
const url = getAssetUrl('/images/logo.png');
// Returns: '/images/logo.png'
```

## 📊 Constants

### Asset Paths

```typescript
import { ASSET_PATHS } from '@bonchi/shared/assets';

const imagePath = ASSET_PATHS.images;  // '/images'
const iconPath = ASSET_PATHS.icons;    // '/icons'
const fontPath = ASSET_PATHS.fonts;    // '/fonts'
```

### Image Quality Presets

```typescript
import { IMAGE_QUALITY } from '@bonchi/shared/assets';

const quality = IMAGE_QUALITY.high;  // 90
const thumb = IMAGE_QUALITY.low;     // 50
```

### Responsive Breakpoints

```typescript
import { RESPONSIVE_BREAKPOINTS } from '@bonchi/shared/assets';

const mobile = RESPONSIVE_BREAKPOINTS.mobile;    // 480
const tablet = RESPONSIVE_BREAKPOINTS.tablet;    // 768
const desktop = RESPONSIVE_BREAKPOINTS.desktop;  // 1024
```

### Image Sizes

```typescript
import { IMAGE_SIZES } from '@bonchi/shared/assets';

const thumb = IMAGE_SIZES.thumbnail;  // 150
const large = IMAGE_SIZES.large;      // 1200
```

## 🎯 Use Cases

### Example 1: Logo Component

```typescript
import { Logo } from '@bonchi/shared/assets';

export const BrandLogo = ({ size = 'medium' }) => {
  const sizes = {
    small: 'w-24 h-8',
    medium: 'w-32 h-10',
    large: 'w-48 h-16'
  };

  return (
    <img 
      src={Logo} 
      alt="Bonchi" 
      className={sizes[size]}
    />
  );
};
```

### Example 2: Preload Critical Assets

```typescript
import { preloadImages } from '@bonchi/shared/assets';
import { Logo, Banner, HeroImage } from '@bonchi/shared/assets';

// In your app initialization
export const preloadCriticalAssets = async () => {
  await preloadImages([Logo, Banner, HeroImage]);
};
```

### Example 3: Responsive Images

```typescript
import { HeroImage } from '@bonchi/shared/assets';
import { getResponsiveSrcSet, RESPONSIVE_BREAKPOINTS } from '@bonchi/shared/assets';

export const Hero = () => {
  const srcSet = getResponsiveSrcSet(HeroImage, [
    RESPONSIVE_BREAKPOINTS.mobile,
    RESPONSIVE_BREAKPOINTS.tablet,
    RESPONSIVE_BREAKPOINTS.desktop,
  ]);

  return (
    <img 
      src={HeroImage}
      srcSet={srcSet}
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      alt="Hero"
    />
  );
};
```

### Example 4: Icon Library

```typescript
// Export all icons
export { default as HomeIcon } from './icons/home.svg';
export { default as UserIcon } from './icons/user.svg';
export { default as SettingsIcon } from './icons/settings.svg';

// Create Icon component
import * as Icons from '@bonchi/shared/assets';

export const Icon = ({ name, size = 24 }) => {
  const IconComponent = Icons[`${name}Icon`];
  return <img src={IconComponent} width={size} height={size} />;
};

// Usage
<Icon name="Home" size={32} />
```

### Example 5: CSS Module

```typescript
// Export styles
export { default as buttonStyles } from './styles/button.css';

// Use in component
import { buttonStyles } from '@bonchi/shared/assets';

export const Button = () => {
  return (
    <button className={buttonStyles.primary}>
      Click me
    </button>
  );
};
```

## 🔧 Configuration

### TypeScript Configuration

The asset type declarations are already set up in `asset-types.d.ts`. No additional TypeScript configuration needed!

### Package.json Exports

Assets are exported via a separate entry point:

```json
{
  "exports": {
    ".": "./dist/index.js",
    "./assets": "./dist/assets/index.js"
  }
}
```

Import as:
```typescript
import { Logo } from '@bonchi/shared/assets';  // ✅ Correct
import { Logo } from '@bonchi/shared';          // ❌ Won't work
```

## 📝 Best Practices

### 1. Organize by Type
```
files/
├── images/brand/     # Brand assets
├── images/products/  # Product images
├── icons/ui/         # UI icons
└── icons/social/     # Social media icons
```

### 2. Use WebP Format
```typescript
// Modern browsers
import HeroWebP from './images/hero.webp';
// Fallback
import HeroJPG from './images/hero.jpg';

<picture>
  <source srcSet={HeroWebP} type="image/webp" />
  <img src={HeroJPG} alt="Hero" />
</picture>
```

### 3. Optimize Before Adding
- Compress images (use tools like ImageOptim, TinyPNG)
- Convert to WebP for better compression
- Generate multiple sizes for responsive images
- Minimize SVG files

### 4. Name Files Consistently
```
logo-light.svg
logo-dark.svg
icon-home-active.svg
icon-home-inactive.svg
banner-hero-mobile.jpg
banner-hero-desktop.jpg
```

### 5. Document Your Assets
Create an `ASSETS.md` in the files directory listing all assets and their purposes.

## 🚨 Common Issues

### Issue: Cannot import image files
**Solution**: Ensure TypeScript can find `asset-types.d.ts`:
```json
// tsconfig.json
{
  "include": ["src/**/*"]
}
```

### Issue: Import path not resolving
**Solution**: Use the correct import path:
```typescript
import { Logo } from '@bonchi/shared/assets';  // ✅ Correct
```

### Issue: Asset not updating
**Solution**: Rebuild the package:
```bash
cd packages/shared
npm run build
```

## 📊 Asset Management Tips

### Version Control
- Commit small assets (< 100KB) to git
- Use Git LFS for large files
- Consider CDN for very large assets

### Performance
- Lazy load images below the fold
- Use appropriate image formats
- Implement responsive images
- Preload critical assets only

### Maintenance
- Regular audit of unused assets
- Optimize images periodically
- Keep assets organized by feature/module

## 🎨 Example: Complete Asset Setup

```typescript
// 1. Add files to directories
// files/images/logo.png
// files/icons/home.svg
// files/styles/global.css

// 2. Export in files/index.ts
export { default as Logo } from './images/logo.png';
export { default as HomeIcon } from './icons/home.svg';
export { default as globalStyles } from './styles/global.css';

// 3. Use in web app
import { Logo, HomeIcon, preloadImage } from '@bonchi/shared/assets';

function App() {
  useEffect(() => {
    preloadImage(Logo);
  }, []);

  return (
    <div>
      <img src={Logo} alt="Logo" />
      <img src={HomeIcon} alt="Home" />
    </div>
  );
}
```

## 🔗 Related Documentation

- [Main Package Documentation](../../README.md)
- [TypeScript Asset Types](./asset-types.d.ts)
- [Asset Utilities](./utils.ts)
- [Asset Constants](./constants.ts)

---

**Ready to add assets?** Just place your files in the `files/` directory, export them, and start using them across your monorepo! 🚀
