const place = require('../../lib/place');
const route = require('./show');

jest.mock('../../lib/place');

describe('place/show', () => {
  beforeEach(() => {
    place.details.mockClear();
  });

  it('throws 404 if no id', async () => {
    const request = { params: {} };
    await expect(route(request)).rejects.toThrowError('Not found');
  });

  it('calls details with id', () => {
    const request = { params: { id: '123' } };
    route(request);

    expect(place.details).toHaveBeenCalledWith('123');
  });

  it('return data', async () => {
    const request = { params: { id: '123' } };
    const promise = route(request);
    const data = { some: 'data' };
    place.details.mock.promises[0].resolve(data);

    await expect(promise).resolves.toEqual(data);
  });
});
