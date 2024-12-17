fastify.get('/route/:name', (req, reply) => {
  console.log(req.params.hasOwnProperty('name')); // true
  return { hello: req.params.name };
});