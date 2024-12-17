

This codemod modernizes `Route` and `Link` components in React Router by:
1. Removing the deprecated `exact` prop from `Route`.
2. Updating `Route` to use the `element` prop.
3. Rewriting dynamic `Link` and `Route` paths that use template literals like `${match.url}` and `${match.path}`.

### Before

```tsx
<Route exact path="/home">
  <HomePage />
</Route>

<Link to={`${match.url}/details`}>Details</Link>

<Route path={`${match.path}/details`}>
  <DetailsPage />
</Route>
```

### After

```tsx
<Route path="/home" element={<HomePage />} />

<Link to="/details">Details</Link>

<Route path="/details" element={<DetailsPage />} />
```

This ensures your code is compatible with newer versions of React Router, which no longer use `exact` and prefer the `element` prop for components. It also simplifies dynamic path generation by removing `match` references.