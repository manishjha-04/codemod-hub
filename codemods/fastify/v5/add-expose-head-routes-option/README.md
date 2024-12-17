
This codemod introduces the `exposeHeadRoutes: false` option to avoid automatic `HEAD` route exposure, while keeping manually defined `HEAD` routes intact.
### Before

```ts
fastify.get('/route', {}, (req, reply) => {
  reply.send({ hello: 'world' });
});

fastify.head('/route', (req, reply) => {
  // ...
});
```

### After

```ts
fastify.get(
  '/route', {
    exposeHeadRoutes: false,
  },
  (req, reply) => {
    reply.send({ hello: 'world' });
  },
);

fastify.head('/route', (req, reply) => {
  // ...
});
```

---
