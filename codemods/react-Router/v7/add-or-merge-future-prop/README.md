

This transformation adds the necessary configuration to enable v7 features, specifically the  v7_startTransition flags. It affects <BrowserRouter>, <RouterProvider>, and createBrowserRouter configurations.

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
    v7_startTransition: true,
  }}
>
  {/* Routes */}
</BrowserRouter>
```


### Before

```ts
<RouterProvider router={router} />;

```

### After

```ts
<RouterProvider
  future={{
    v7_startTransition: true,
  }}
  router={router}
/>;
```
