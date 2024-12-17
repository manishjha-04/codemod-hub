

This transformation adds the necessary configuration to enable v7 features, specifically adds the v7_normalizeFormMethod

### Before

```ts
const router = createBrowserRouter(routes);
```

### After

```ts
const router = createBrowserRouter(routes, {
  future: {
    v7_normalizeFormMethod: true,
  },
});
```
