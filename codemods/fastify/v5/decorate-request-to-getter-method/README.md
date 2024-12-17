

This codemod transforms `fastify.decorateRequest` with static objects into the new Fastify v5 pattern using a getter function.

### Before

```ts
fastify.decorateRequest('myObject', { hello: 'world' });
```

### After

```ts
fastify.decorateRequest('myObject', {
  getter() {
    return { hello: 'world' };
  },
});
```

---

This shows the transition from decorating requests with static objects to using a getter method in Fastify v5, which allows for more dynamic and flexible request decorations.