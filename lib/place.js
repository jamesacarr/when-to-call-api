const google = require('./google');

const DEFAULT_HOURS = [
  { close: { day: 1, time: '1700' }, open: { day: 1, time: '0900' } },
  { close: { day: 2, time: '1700' }, open: { day: 2, time: '0900' } },
  { close: { day: 3, time: '1700' }, open: { day: 3, time: '0900' } },
  { close: { day: 4, time: '1700' }, open: { day: 4, time: '0900' } },
  { close: { day: 5, time: '1700' }, open: { day: 5, time: '0900' } },
];

const transformPredictions = predictions =>
  predictions.reduce((obj, place) => {
    obj[place.place_id] = {
      id: place.place_id,
      primary: place.structured_formatting.main_text,
      secondary: place.structured_formatting.secondary_text,
    };
    return obj;
  }, {});

const transformDetails = place => ({
  name: place.name,
  address: place.formatted_address,
  phone: place.international_phone_number,
  openingHours: place.opening_hours ? place.opening_hours.periods : DEFAULT_HOURS,
  utcOffset: place.utc_offset,
});

module.exports = {
  autocomplete: input =>
    google('/autocomplete', { types: 'establishment', input }).then(({ predictions }) =>
      transformPredictions(predictions)
    ),
  details: placeid => google('/details', { placeid }).then(({ result }) => transformDetails(result)),
};
