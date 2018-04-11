const { createMockPromise } = require('../../test/mock-promise');

module.exports = {
  autocomplete: createMockPromise(),
  details: createMockPromise(),
};
