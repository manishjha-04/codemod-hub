


This transformation updates the routing structure for multi-segment splat paths. It affects both createBrowserRouter configurations and <Routes> components.

### Before

```ts
createBrowserRouter([
  { path: '/', element: < Home / > },
  {
    path: 'dashboard/*',
    element: < Dashboard / > ,
  },
]);
```

### After

```ts
createBrowserRouter([
  { path: '/', element: < Home / > },
  {
    path: 'dashboard',
    children: [{
      path: '*',
      element: < Dashboard / > ,
    }, ],
  },
]);
```
