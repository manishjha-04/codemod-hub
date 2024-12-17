This transformation adds the necessary configuration to enable v7 features, specifically the v7_relativeSplatPath flag. It affects both <BrowserRouter> components and createBrowserRouter configurations.

### Before

```ts
<BrowserRouter>
  {/* Routes */}
</BrowserRouter>
```

### After

```ts
<BrowserRouter
  future={{
    v7_relativeSplatPath: true,
  }}
>
  {/* Routes */}
</BrowserRouter>
```
### Before

```ts
const router = createBrowserRouter(routes);
```

### After

```ts
const router = createBrowserRouter(routes, {
  future: {
    v7_relativeSplatPath: true,
  },
});
```
This change adds the future option with the v7_relativeSplatPath flag set to true. This enables the new behavior for relative path matching and linking for multi-segment splat paths in React Router v7.