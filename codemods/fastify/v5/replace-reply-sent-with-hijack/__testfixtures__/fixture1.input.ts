fastify.get('/route', (req, reply) => {
  reply.sent = true;
  reply.raw.end('hello');
});