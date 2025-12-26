# 12signals-components

Private Design System package for 12signals projects.

## Install (Git dependency)

```bash
npm install git+ssh://<host>/<org>/12signals-components.git
```

## Local development with git dependency

Keep the app's dependency pointing to the Git URL (deploy-friendly) and use npm link locally:

```bash
cd /path/to/12signals-components
npm install
npm link

cd /path/to/12signals-app
npm link 12signals-components
```

Run a watcher for live rebuilds:

```bash
cd /path/to/12signals-components
npm run dev
```

## Usage

```ts
import { Button } from "12signals-components";
import "12signals-components/tokens.css";
import "12signals-components/reset.css";
import "12signals-components/globals.css";
```

## Required theme variables

Provide these CSS variables in your app theme (see `12signals-app/src/index.css` for reference):

- --primary, --primary-foreground
- --secondary, --secondary-foreground
- --accent, --accent-foreground
- --success, --success-foreground
- --warning, --warning-foreground
- --destructive, --destructive-foreground
- --background, --foreground
- --card, --card-foreground
- --muted, --muted-foreground
- --border
- --shadow-soft, --shadow-card, --shadow-glow
- --gradient-card
- --radius
