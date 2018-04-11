const axios = require('axios');
const google = require('./google');

describe('google', () => {
  beforeEach(() => {
    axios.get.mockClear();
  });

  it('calls api', () => {
    google('/test');

    const regex = /^https:\/\/maps\.googleapis\.com\/maps\/api\/place\/test/;
    expect(axios.get).toHaveBeenCalledWith(expect.stringMatching(regex), {
      params: { key: process.env.GOOGLE_API_KEY },
    });
  });

  it('resolves data when status OK', async () => {
    const response = { data: { status: 'OK', some: 'data' } };
    const promise = google('/test');
    axios.get.mock.promises[0].resolve(response);

    await expect(promise).resolves.toEqual(response.data);
  });

  it('throws 404 when status is NOT_FOUND', async () => {
    const response = { data: { status: 'NOT_FOUND', some: 'data' } };
    const promise = google('/test');
    axios.get.mock.promises[0].resolve(response);

    await expect(promise).rejects.toThrowError('Not found');
  });

  it('throws 429 when status is OVER_QUERY_LIMIT', async () => {
    const response = { data: { status: 'OVER_QUERY_LIMIT', some: 'data' } };
    const promise = google('/test');
    axios.get.mock.promises[0].resolve(response);

    await expect(promise).rejects.toThrowError('Over query limit');
  });

  it('throws 500 when status is ERROR', async () => {
    const response = { data: { status: 'ERROR', some: 'data' } };
    const promise = google('/test');
    axios.get.mock.promises[0].resolve(response);

    await expect(promise).rejects.toThrowError('Internal server error');
  });

  it('throws 500 when status is INVALID_REQUEST', async () => {
    const response = { data: { status: 'INVALID_REQUEST', some: 'data' } };
    const promise = google('/test');
    axios.get.mock.promises[0].resolve(response);

    await expect(promise).rejects.toThrowError('Internal server error');
  });

  it('throws 500 when status is UNKNOWN_ERROR', async () => {
    const response = { data: { status: 'UNKNOWN_ERROR', some: 'data' } };
    const promise = google('/test');
    axios.get.mock.promises[0].resolve(response);

    await expect(promise).rejects.toThrowError('Internal server error');
  });
});
