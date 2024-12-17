fastify.get('/route', (req, reply) => {
  reply.trailer('ETag', async function(reply, payload) {
    return 'custom-etag';
  });
  reply.send('');
});