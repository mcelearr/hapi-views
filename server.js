const Hapi = require('hapi');
const server = new Hapi.Server();
const Vision = require('vision');
const Handlebars = require('handlebars')

const port = { port: process.env.PORT || 4000 };
server.connection(port);
server.register(Vision, (err) => {
  if (err) throw err;
  server.route({
    path: '/',
    method: 'GET',
    handler: (request, reply) => {
      reply.view('home', {myVar: ['some content','some more content','even more content']})
    }
  })

  server.views({
    engines: {html: Handlebars},
    relativeTo: __dirname,
    path: './views',
    layout: 'default',
    layoutPath: './views/layout',
    partialsPath: './views/partials',
    helpersPath: './views/helpers'
  });
});

server.start((err) => {
  if (err) throw err;
  console.log(`server is listening on port ${port.port}`);
})
