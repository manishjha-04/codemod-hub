

This codemod turns `req.params.hasOwnProperty('name')` into `Object.hasOwn(req.params, 'name')`, reflecting the new Fastify v5 approach to property checking.

### Before

```ts
fastify.get('/route/:name', (req, reply) => {
  console.log(req.params.hasOwnProperty('name')); // true
  return { hello: req.params.name };
});
```

### After

```ts
fastify.get('/route/:name', (req, reply) => {
  console.log(Object.hasOwn(req.params, 'name')); // true
  return { hello: req.params.name };
});
```


