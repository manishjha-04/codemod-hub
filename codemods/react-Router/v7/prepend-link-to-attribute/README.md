


This transformation updates <Link> elements within route trees to include an extra relative segment. This ensures that links continue to point to the correct locations after the route structure changes.

### Before

```ts

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <nav>
        <Link to="/">Dashboard Home</Link>
        <Link to="team">Team</Link>
        <Link to="projects">Projects</Link>
      </nav>
    </div>
  );
}
```

### After

```ts
function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <nav>
        <Link to="../">Dashboard Home</Link>
        <Link to="../team">Team</Link>
        <Link to="../projects">Projects</Link>
      </nav>
    </div>
  );
}
```

