# 12signals-components

Private Design System package for 12signals projects.

## Install (Git dependency)

```bash
npm install git+ssh://<host>/<org>/12signals-components.git
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
