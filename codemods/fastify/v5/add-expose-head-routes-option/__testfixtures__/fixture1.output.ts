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