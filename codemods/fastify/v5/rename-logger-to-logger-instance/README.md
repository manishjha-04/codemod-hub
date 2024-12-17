

This codemod updates the Fastify logger configuration by renaming the `logger` option to `loggerInstance`, in line with Fastify v5 changes.

### Before

```ts
const logger = require('pino')();
const fastify = require('fastify')({
  logger,
});
```

### After

```ts
const loggerInstance = require('pino')();
const fastify = require('fastify')({
  loggerInstance,
});
```

---

This example shows how the codemod modifies the logger option to `loggerInstance`, aligning with the updated configuration practices in Fastify v5.