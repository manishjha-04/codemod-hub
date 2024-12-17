fastify.get('/example/:file(^\\d+).png', function(request, reply) {});

console.log(
  fastify.hasRoute({
    method: 'GET',
    url: '/example/12345.png',
  }),
);