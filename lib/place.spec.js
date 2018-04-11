/* eslint-disable camelcase */

const { autocomplete, details } = require('./place');
const google = require('./google');

jest.mock('./google');

describe('place', () => {
  beforeEach(() => {
    google.mockClear();
  });

  describe('.autocomplete', () => {
    let promise;

    beforeEach(() => {
      promise = autocomplete('abc');
    });

    it('calls google', () => {
      expect(google).toHaveBeenCalledWith('/autocomplete', { types: 'establishment', input: 'abc' });
    });

    it('returns formatted predictions', async () => {
      const data = {
        status: 'OK',
        predictions: [
          { place_id: 'abc', structured_formatting: { main_text: 'Main ABC', secondary_text: 'Secondary ABC' } },
          { place_id: 'def', structured_formatting: { main_text: 'Main DEF', secondary_text: 'Secondary DEF' } },
          { place_id: 'ghi', structured_formatting: { main_text: 'Main GHI', secondary_text: 'Secondary GHI' } },
        ],
      };
      const expected = {
        abc: { id: 'abc', primary: 'Main ABC', secondary: 'Secondary ABC' },
        def: { id: 'def', primary: 'Main DEF', secondary: 'Secondary DEF' },
        ghi: { id: 'ghi', primary: 'Main GHI', secondary: 'Secondary GHI' },
      };
      google.mock.promises[0].resolve(data);

      await expect(promise).resolves.toEqual(expected);
    });
  });

  describe('.details', () => {
    let promise;

    beforeEach(() => {
      promise = details('123');
    });

    it('calls google', () => {
      expect(google).toHaveBeenCalledWith('/details', { placeid: '123' });
    });

    it('returns formatted result', async () => {
      const data = {
        status: 'OK',
        result: {
          name: 'Test',
          formatted_address: '123 Fake St, Fakeville',
          international_phone_number: '+1 234-567-890',
          opening_hours: { periods: [{ close: { day: 0, time: '2200' }, open: { day: 0, time: '1100' } }] },
          utc_offset: -240,
        },
      };
      const expected = {
        name: 'Test',
        address: '123 Fake St, Fakeville',
        phone: '+1 234-567-890',
        openingHours: [{ close: { day: 0, time: '2200' }, open: { day: 0, time: '1100' } }],
        utcOffset: -240,
      };
      google.mock.promises[0].resolve(data);

      await expect(promise).resolves.toEqual(expected);
    });
  });
});
