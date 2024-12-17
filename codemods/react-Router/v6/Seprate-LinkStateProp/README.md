

This codemod simplifies the `Link` component by transforming its `to` prop from an object with a `pathname` to a string. It removes the unnecessary object wrapper around the `pathname`, maintaining the `state` prop as is.

### Before

```tsx
<Link to={{ pathname: "/home", state: { from: "/login" } }} />
```

### After

```tsx
<Link to="/home" state={{ from: "/login" }} />
```

This change enhances the readability of your `Link` components by using a more straightforward string representation for the `to` prop, aligning with current best practices in React Router.