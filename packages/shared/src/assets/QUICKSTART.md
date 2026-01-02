# 🚀 Assets Quick Start Guide

## Add and Use Assets in 3 Steps

### Step 1: Add Your File
```bash
# Place your asset in the appropriate directory
packages/shared/src/assets/files/images/my-logo.png
```

### Step 2: Export It
```typescript
// Edit: packages/shared/src/assets/files/index.ts

export { default as MyLogo } from './images/my-logo.png';
```

### Step 3: Use It!
```typescript
// In your web app
import { MyLogo } from '@bonchi/shared/assets';

function App() {
  return <img src={MyLogo} alt="My Logo" />;
}
```

## 📋 Supported File Types

✅ **Images**: PNG, JPG, SVG, GIF, WebP, ICO  
✅ **Styles**: CSS, SCSS, SASS, LESS  
✅ **Fonts**: WOFF, WOFF2, TTF, OTF, EOT  
✅ **Media**: MP4, WebM, MP3, WAV  
✅ **Documents**: PDF, JSON, YAML, TXT, MD

## 🛠️ Utility Functions

```typescript
import { 
  preloadImage,
  isImage,
  getMimeType,
  formatFileSize 
} from '@bonchi/shared/assets';

// Preload images
await preloadImage('/path/to/image.jpg');

// Check file type
isImage('photo.jpg');  // true

// Get MIME type
getMimeType('video.mp4');  // 'video/mp4'

// Format file sizes
formatFileSize(1024000);  // '1000 KB'
```

## 📊 Constants

```typescript
import { 
  ASSET_PATHS,
  IMAGE_QUALITY,
  RESPONSIVE_BREAKPOINTS,
  IMAGE_SIZES 
} from '@bonchi/shared/assets';

// Use predefined paths
const path = ASSET_PATHS.images;  // '/images'

// Image quality settings
const quality = IMAGE_QUALITY.high;  // 90

// Responsive breakpoints
const mobile = RESPONSIVE_BREAKPOINTS.mobile;  // 480

// Image size presets
const thumb = IMAGE_SIZES.thumbnail;  // 150
```

## 🎯 Common Patterns

### Pattern 1: Simple Image
```typescript
import { Logo } from '@bonchi/shared/assets';

<img src={Logo} alt="Logo" />
```

### Pattern 2: Preload Images
```typescript
import { preloadImages } from '@bonchi/shared/assets';
import { Logo, Banner } from '@bonchi/shared/assets';

useEffect(() => {
  preloadImages([Logo, Banner]);
}, []);
```

### Pattern 3: Responsive Images
```typescript
import { Hero } from '@bonchi/shared/assets';
import { getResponsiveSrcSet } from '@bonchi/shared/assets';

const srcSet = getResponsiveSrcSet(Hero, [480, 768, 1024, 1920]);

<img 
  src={Hero}
  srcSet={srcSet}
  sizes="100vw"
/>
```

### Pattern 4: SVG Icons
```typescript
import { HomeIcon, UserIcon } from '@bonchi/shared/assets';

<div>
  <img src={HomeIcon} width={24} height={24} />
  <img src={UserIcon} width={24} height={24} />
</div>
```

## 📁 Organize Your Assets

```
files/
├── images/
│   ├── brand/
│   │   ├── logo.svg
│   │   └── logo-dark.svg
│   ├── products/
│   │   └── product-hero.jpg
│   └── ui/
│       └── background.png
├── icons/
│   ├── navigation/
│   │   ├── home.svg
│   │   └── user.svg
│   └── social/
│       ├── twitter.svg
│       └── facebook.svg
└── fonts/
    └── custom-font.woff2
```

## 🔨 Build After Adding Assets

```bash
cd packages/shared
npm run build
```

## 💡 Tips

1. **Optimize images** before adding (compress, resize)
2. **Use WebP** for better compression
3. **Name consistently** (logo-light.svg, logo-dark.svg)
4. **Keep it small** - consider CDN for large files
5. **Lazy load** images below the fold

## 📚 Full Documentation

See [README.md](./README.md) for complete documentation.

---

**That's it!** Add your assets and start using them across your monorepo! 🎉
