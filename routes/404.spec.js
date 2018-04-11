const route = require('./404');

describe('404', () => {
  it('throws 404', () => {
    expect(route).toThrow('Not found');
  });
});
