

This codemod updates `useRouteMatch` calls to the newer `useMatch` function in `react-router-dom`. It also adjusts any arguments passed to `useRouteMatch`, changing `strict` to `end` and `sensitive` to `caseSensitive`. Additionally, it ensures that imports are updated to reflect the removal of `useRouteMatch`.

### Before

```tsx
import { useRouteMatch } from "react-router-dom";

const match = useRouteMatch({
  path: "/home",
  strict: true,
  sensitive: false,
});
```

### After

```tsx
import { useMatch } from "react-router-dom";

const match = useMatch({
  path: "/home",
  end: true,
  caseSensitive: false,
});
```

This codemod streamlines the use of route matching in your application, aligning with the latest React Router practices while ensuring existing functionality is preserved. It also removes any obsolete references to `useRouteMatch` in imports.