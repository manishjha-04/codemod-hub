

This codemod updates `fastify.register` to use `return` instead of `done`, reflecting changes in Fastify v5 for asynchronous plugin registration.

### Before

```ts
fastify.register(async function(instance, opts, done) {
  done();
});
```

### After

```ts
fastify.register(async function(instance, opts) {
  return;
});
```

---
