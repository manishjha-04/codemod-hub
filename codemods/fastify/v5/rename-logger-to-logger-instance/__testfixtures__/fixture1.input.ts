const logger = require('pino')();
const fastify = require('fastify')({
  logger,
});