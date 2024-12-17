

This codemod converts `reply.getResponseTime()` to `reply.elapsedTime`, reflecting changes in Fastify v5 for retrieving response time.

### Before

```ts
fastify.get('/route', (req, reply) => {
  console.log(reply.getResponseTime());
  return { hello: 'world' };
});
```

### After

```ts
fastify.get('/route', (req, reply) => {
  console.log(reply.elapsedTime);
  return { hello: 'world' };
});
```

---
