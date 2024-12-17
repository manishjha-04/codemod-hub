

This codemod updates references from `req.connection` to `req.socket`, reflecting changes in Fastify v5's request handling.

### Before

```ts
fastify.get('/route', (req, reply) => {
  console.log(req.connection.remoteAddress);
  return { hello: 'world' };
});
```

### After

```ts
fastify.get('/route', (req, reply) => {
  console.log(req.socket.remoteAddress);
  return { hello: 'world' };
});
```

---

