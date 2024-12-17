

This codemod highlights the shift in how routes with dynamic parameters should be referenced in `fastify.hasRoute` in Fastify v5.

### Before

```ts
fastify.get('/example/:file(^\\d+).png', function(request, reply) {});

console.log(
  fastify.hasRoute({
    method: 'GET',
    url: '/example/12345.png',
  }),
);
```

### After

```ts
fastify.get('/example/:file(^\\d+).png', function(request, reply) {});

console.log(
  fastify.hasRoute({
    method: 'GET',
    url: '/example/:file(^\\d+).png',
  }),
);
```

---

