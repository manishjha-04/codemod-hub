

This codemod turns `reply.sent = true` into `reply.hijack()`, updating to the new Fastify v5 method for handling manual responses.

### Before

```ts
fastify.get('/route', (req, reply) => {
  reply.sent = true;
  reply.raw.end('hello');
});
```

### After

```ts
fastify.get('/route', (req, reply) => {
  reply.hijack();
  reply.raw.end('hello');
});
```

---

