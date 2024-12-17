


This transformation restructures action functions to perform error checking before data mutations. This change aligns with the new behavior in v7 where loaders no longer revalidate by default after an action throws or returns a Response with a 4xx/5xx status code.

### Before

```ts
async function action() {
  await mutateSomeData();
  if (detectError()) {
    throw new Response(error, { status: 400 });
  }
  await mutateOtherData();
  // ...
}
```

### After

```ts
async function action() {
  if (detectError()) {
    throw new Response(error, { status: 400 });
  }
  // All data is now mutated after validations
  await mutateSomeData();
  await mutateOtherData();
}
```

