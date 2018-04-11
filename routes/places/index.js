const { autocomplete } = require('../../lib/place');

module.exports = ({ query: { q } }) => {
  if (!q) {
    return Promise.resolve([]);
  }

  return autocomplete(q);
};
