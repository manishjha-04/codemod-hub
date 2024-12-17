fastify.get('/route', (req, reply) => {
  reply.hijack();
  reply.raw.end('hello');
});