const loggerInstance = require('pino')();
const fastify = require('fastify')({
  loggerInstance,
});