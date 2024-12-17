

This codemod updates imports of `StaticRouter` to use the `react-router-dom/server` package instead of `react-router-dom`, in line with updated React Router requirements.

### Before

```tsx
import { BrowserRouter, Route, StaticRouter } from "react-router-dom";
```

### After

```tsx
import { BrowserRouter, Route } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
```

This codemod ensures compatibility with the latest React Router version by splitting `StaticRouter` imports into the correct package. Other imports from `react-router-dom` remain unaffected.