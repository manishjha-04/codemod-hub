fastify.get('/route', (req, reply) => {
  reply.trailer('ETag', function(reply, payload) {
    return 'custom-etag';
  });
  reply.send('');
});