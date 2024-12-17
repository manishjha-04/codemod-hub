

This codemod helps update code that uses `react-router-config` to the modern `useRoutes` API from `react-router-dom`. It removes `renderRoutes` from imports and replaces it with `useRoutes`. Manual adjustments might be required after running the codemod, especially if other customizations exist in your routing logic.

### Before

```tsx
import { BrowserRouter as Router } from "react-router-dom";
import { renderRoutes } from "react-router-config";

const routes = [
  {
    path: "/",
    component: HomePage,
    exact: true,
  },
  {
    path: "/about",
    component: AboutPage,
  },
];

function App() {
  return <Router>{renderRoutes(routes)}</Router>;
}
```

### After

```tsx
import { BrowserRouter as Router, useRoutes } from "react-router-dom";

const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
];

function App() {
  const routing = useRoutes(routes);
  return <Router>{routing}</Router>;
}
``` 

This demonstrates how the routing logic is updated to use `useRoutes` instead of `renderRoutes`, and routes are adapted from `component` to `element`.