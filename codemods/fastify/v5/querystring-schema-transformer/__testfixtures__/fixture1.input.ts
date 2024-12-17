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