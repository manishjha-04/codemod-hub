fastify.get('/route', (req, reply) => {
  console.log(reply.elapsedTime);
  return { hello: 'world' };
});