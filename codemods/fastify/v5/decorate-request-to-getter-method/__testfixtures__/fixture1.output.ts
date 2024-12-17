fastify.decorateRequest('myObject', {
  getter() {
    return { hello: 'world' };
  },
});