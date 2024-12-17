

This codemod turns `fastify.listen(8000)` into `fastify.listen({ port: 8000 })`, reflecting the highlights of the migration from the old `listen` method signature to the new object-based approach in Fastify v5.
### Before

```ts
fastify.listen(8000);
```

### After

```ts
fastify.listen({
  port: 8000,
});
```

---
