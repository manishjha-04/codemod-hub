

This recipe provides a set of codemods designed to assist with migrating  to Fastify 5. Each codemod addresses specific changes and enhancements introduced in Fastify 5.

### Included Codemods

- **`fastify/5/req-params-hasOwnProperty-to-objectHasOwn`**: Converts `req.params.hasOwnProperty` to `Object.hasOwn`.
- **`fastify/5/listen-arg-transformation`**: Updates the transformation of arguments passed to `listen`.
- **`fastify/5/replace-hardcoded-url-in-hasroute`**: Replaces hardcoded URLs in `hasRoute` checks.
- **`fastify/5/replace-reply-sent-with-hijack`**: Replaces `reply.sent` with `reply.hijack`.
- **`fastify/5/add-expose-head-routes-option`**: Adds the `exposeHeadRoutes` option where necessary.
- **`fastify/5/decorate-request-to-getter-method`**: Converts request decorators to getter methods.
- **`fastify/5/route-schema-enhancement`**: Enhances route schemas with new features.
- **`fastify/5/req-connection-to-socket`**: Converts `req.connection` to `req.socket`.
- **`fastify/5/getResponseTime-to-elapsedTime`**: Renames `getResponseTime` to `elapsedTime`.
- **`fastify/5/redirect-arg-order`**: Updates the argument order for `redirect`.
- **`fastify/5/make-reply-trailer-async`**: Converts `reply.trailer` to an async method.
- **`fastify/5/remove-done-callback`**: Changes `plugin.register` from `done` callback to `return`.
- **`fastify/5/rename-logger-to-logger-instance`**: Renames `logger` to `loggerInstance`.

These codemods will help streamline your migration process and ensure compatibility with Fastify 5.

---
