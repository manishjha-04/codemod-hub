
This codemod updates deprecated `Redirect` components from `react-router-dom` to the modern `Navigate` API. It also updates the imports by replacing `Redirect` with `Navigate`.

### Before

```tsx
import { Redirect, Route, Switch } from "react-router-dom";

<Redirect to="/home" />;
<Redirect to="/home" push={true} />;
```

### After

```tsx
import { Navigate, Route, Switch } from "react-router-dom";

<Navigate to="/home" />;
<Navigate to="/home" replace />;
```

This change ensures compatibility with newer versions of `react-router-dom` by using `Navigate` in place of `Redirect`.