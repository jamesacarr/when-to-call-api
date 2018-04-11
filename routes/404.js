const { createError } = require('micro');

module.exports = () => {
  throw createError(404, 'Not found');
};
