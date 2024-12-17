

This codemod enhances the schema definition for query strings by converting it to the full object schema format, adding properties and required fields.

### Before

```ts
fastify.get(
  '/route', {
    schema: {
      querystring: {
        name: { type: 'string' },
      },
    },
  },
  (req, reply) => {
    reply.send({ hello: req.query.name });
  },
);
```

### After

```ts
fastify.get(
  '/route', {
    schema: {
      querystring: {
        type: 'object',
        properties: {
          name: { type: 'string' },
        },
        required: ['name'],
      },
    },
  },
  (req, reply) => {
    reply.send({ hello: req.query.name });
  },
);
```

---

This illustrates how the codemod updates query string schema definitions in Fastify v5 to the more detailed object schema format, ensuring proper validation.