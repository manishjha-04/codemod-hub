

This codemod transforms `Route` components using `render` and `component` props into JSX with nested children.

### Before

#### Using `render`:

```tsx
<Route path="/example" render={() => <MyComponent />} />
```

#### Using `component`:

```tsx
<Route path="/example" component={MyComponent} />
```

### After

#### Converted `render`:

```tsx
<Route path="/example">
  <MyComponent />
</Route>
```

#### Converted `component`:

```tsx
<Route path="/example">
  <MyComponent />
</Route>
```