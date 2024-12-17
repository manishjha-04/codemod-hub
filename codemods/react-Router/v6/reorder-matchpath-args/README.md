

This codemod reorders the arguments in the `matchPath` function calls. It switches the position of the string path and the second callback argument, improving consistency and readability.

### Before

```tsx
matchPath("/home", { exact: true });
```

### After

```tsx
matchPath({ exact: true }, "/home");
```

This change ensures that the string path is now the second argument, following the newer convention for using `matchPath`.