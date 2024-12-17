

This codemod updates the `reply.trailer` method to use an `async` function for handling trailers, aligning with Fastify v5's support for asynchronous operations in trailers.

### Before

```ts
fastify.get('/route', (req, reply) => {
  reply.trailer('ETag', function(reply, payload) {
    return 'custom-etag';
  });
  reply.send('');
});
```

### After

```ts
fastify.get('/route', (req, reply) => {
  reply.trailer('ETag', async function(reply, payload) {
    return 'custom-etag';
  });
  reply.send('');
});
```

---
