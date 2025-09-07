# Krypton UI - Installation Guide

## Private BitBucket Repository Installation

Since this is a private UI library hosted on BitBucket, follow these steps to install it in your project:

### Prerequisites

1. Make sure you have access to the private BitBucket repository
2. Configure SSH access to BitBucket (recommended) or use HTTPS with credentials

### Installation Methods

#### Method 1: SSH Installation (Recommended)

```bash
npm install git+ssh://git@bitbucket.org/your-username/krypton-ui.git
```

#### Method 2: HTTPS Installation

```bash
npm install git+https://bitbucket.org/your-username/krypton-ui.git
```

#### Method 3: Specific Branch/Tag Installation

```bash
# Install from specific branch
npm install git+ssh://git@bitbucket.org/your-username/krypton-ui.git#branch-name

# Install from specific tag
npm install git+ssh://git@bitbucket.org/your-username/krypton-ui.git#v1.0.0
```

### Usage

#### Import Components

After installation, you can import components like this:

```typescript
// Import individual components
import { Button, Card, Input } from 'krypton-ui';

// Import utilities
import { cn } from 'krypton-ui';

// Import hooks
import { useMobile } from 'krypton-ui';
```

#### Import Styles

Add the CSS file to your main CSS file or import it in your app:

```css
/* In your main CSS file */
@import 'krypton-ui/styles.css';
```

Or import it in your JavaScript/TypeScript entry file:

```tsx
// In your main.tsx or App.tsx
import 'krypton-ui/styles.css';
```

### Required Peer Dependencies

Make sure you have these installed in your project:

```bash
npm install react@>=16.8.0 react-dom@>=16.8.0 tailwindcss
```

### Avoiding React Version Conflicts

To prevent React version conflicts, ensure:

1. **Single React Version**: Only one version of React should be installed in your project
2. **Check for Duplicates**: Run `npm ls react` to check for multiple React versions
3. **Resolution Strategy**: If you have conflicts, add this to your `package.json`:

```json
{
  "overrides": {
    "react": "$react",
    "react-dom": "$react-dom"
  }
}
```

Or for Yarn:

```json
{
  "resolutions": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

### Tailwind CSS Configuration

Add the Krypton UI path to your `tailwind.config.js`:

```javascript
module.exports = {
  content: [
    // ... your existing paths
    './node_modules/krypton-ui/**/*.{js,ts,jsx,tsx}',
  ],
  // ... rest of your config
}
```

### TypeScript Support

The library is built with TypeScript and includes type definitions. No additional setup required.

### Updating the Library

```bash
npm update krypton-ui
```

### Troubleshooting

1. **Access Issues**: Make sure you have proper access to the BitBucket repository
2. **SSH Issues**: Verify your SSH key is added to BitBucket
3. **Version Issues**: Use specific tags for stable versions

### Support

For issues and questions, please contact the Krypton UI team or create an issue in the BitBucket repository.