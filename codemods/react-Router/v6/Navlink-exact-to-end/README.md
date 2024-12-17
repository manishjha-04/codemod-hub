
This codemod replaces the deprecated `exact` prop in `NavLink` with the modern `end` prop. React Router v6 and beyond use `end` to indicate that the path should match exactly, making this a necessary update for compatibility with newer versions.

### Before

```tsx
<NavLink exact to="/example">Example</NavLink>
```

### After

```tsx
<NavLink end to="/example">Example</NavLink>
```