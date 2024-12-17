
This codemod updates `NavLink` components that use separate `style` and `activeStyle` props to the modern `isActive` function in `react-router-dom`. It simplifies the logic by combining the two props into a single `style` prop with conditional styling.

### Before

```tsx
<NavLink to="/home" style={{ color: 'blue' }} activeStyle={{ color: 'red' }}>
  Home
</NavLink>
```

### After

```tsx
<NavLink to="/home" style={({ isActive }) => ({ color: isActive ? 'red' : 'blue' })}>
  Home
</NavLink>
```

This makes the component more concise and aligns it with the newer API for conditional styles based on the `isActive` property.