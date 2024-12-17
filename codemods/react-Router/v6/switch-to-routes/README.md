

This codemod updates `Switch` components to `Routes` in React Router, in line with React Router v6 and newer. It also adjusts the imports, replacing `Switch` with `Routes` in `react-router-dom` import statements.

### Before

```tsx
import { BrowserRouter, Route, Switch } from "react-router-dom";

<Switch>
  <Route path="/home" element={<HomePage />} />
  <Route path="/about" element={<AboutPage />} />
</Switch>
```

### After

```tsx
import { BrowserRouter, Route, Routes } from "react-router-dom";

<Routes>
  <Route path="/home" element={<HomePage />} />
  <Route path="/about" element={<AboutPage />} />
</Routes>
```

This codemod modernizes routing logic by using `Routes` instead of `Switch`, aligning your code with the latest practices in React Router.