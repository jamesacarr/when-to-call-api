const { createError } = require('micro');
const { details } = require('../../lib/place');

module.exports = async ({ params: { id } }) => {
  if (!id) {
    throw createError(404, 'Not found');
  }

  return details(id);
};
