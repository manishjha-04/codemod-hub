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