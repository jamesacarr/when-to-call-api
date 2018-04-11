const { router, get } = require('microrouter');
const cors = require('micro-cors')({ allowMethods: ['GET'] });

module.exports = cors(
  router(
    get('/places', require('./routes/places')),
    get('/places/:id', require('./routes/places/show')),
    get('/*', require('./routes/404'))
  )
);
