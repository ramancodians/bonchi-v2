/**
 * Asset type declarations for TypeScript
 * This allows importing images, CSS, and other files with proper typing
 */

// Image formats
declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const content: string;
  export default content;
}

declare module '*.ico' {
  const content: string;
  export default content;
}

// SVG as React component (for bundlers that support it)
declare module '*.svg?react' {
  import { FunctionComponent, SVGProps } from 'react';
  const content: FunctionComponent<SVGProps<SVGSVGElement>>;
  export default content;
}

// CSS and style formats
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.sass' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.less' {
  const content: { [className: string]: string };
  export default content;
}

// Font formats
declare module '*.woff' {
  const content: string;
  export default content;
}

declare module '*.woff2' {
  const content: string;
  export default content;
}

declare module '*.ttf' {
  const content: string;
  export default content;
}

declare module '*.eot' {
  const content: string;
  export default content;
}

declare module '*.otf' {
  const content: string;
  export default content;
}

// Video formats
declare module '*.mp4' {
  const content: string;
  export default content;
}

declare module '*.webm' {
  const content: string;
  export default content;
}

declare module '*.ogg' {
  const content: string;
  export default content;
}

// Audio formats
declare module '*.mp3' {
  const content: string;
  export default content;
}

declare module '*.wav' {
  const content: string;
  export default content;
}

declare module '*.flac' {
  const content: string;
  export default content;
}

// Document formats
declare module '*.pdf' {
  const content: string;
  export default content;
}

// Data formats
declare module '*.json' {
  const content: any;
  export default content;
}

declare module '*.json5' {
  const content: any;
  export default content;
}

declare module '*.yaml' {
  const content: any;
  export default content;
}

declare module '*.yml' {
  const content: any;
  export default content;
}

declare module '*.toml' {
  const content: any;
  export default content;
}

// Text formats
declare module '*.txt' {
  const content: string;
  export default content;
}

declare module '*.md' {
  const content: string;
  export default content;
}

// Other web assets
declare module '*.xml' {
  const content: string;
  export default content;
}

declare module '*.html' {
  const content: string;
  export default content;
}
