const place = require('../../lib/place');
const route = require('.');

jest.mock('../../lib/place');

describe('place/index', () => {
  beforeEach(() => {
    place.autocomplete.mockClear();
  });

  it('returns empty array when no query', async () => {
    const request = { query: {} };
    await expect(route(request)).resolves.toEqual([]);
  });

  it('calls autocomplete with query', () => {
    const request = { query: { q: 'abc' } };
    route(request);

    expect(place.autocomplete).toHaveBeenCalledWith('abc');
  });

  it('returns autocomplete result', async () => {
    const request = { query: { q: 'abc' } };
    const data = { status: 'OK', predictions: [{ id: 'a' }, { id: 'b' }] };

    const result = route(request);
    place.autocomplete.mock.promises[0].resolve(data);

    await expect(result).resolves.toEqual(data);
  });
});
