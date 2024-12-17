

This transformation adds the necessary configuration to enable v7 features, specifically the v7_partialHydration_Flag flags

### Before

```ts
const router = createBrowserRouter(routes);
```

### After

```ts
const router = createBrowserRouter(routes, {
  future: {
    v7_partialHydration: true,
  },
});
```
