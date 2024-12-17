

This codemod updates `reply.redirect` by placing the status code as the second argument, as per Fastify v5 conventions.

### Before

```ts
reply.redirect(301, '/new-route');
```

### After

```ts
reply.redirect('/new-route', 301);
```

---

