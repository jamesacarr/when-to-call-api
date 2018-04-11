require('now-env'); // eslint-disable-line import/no-unassigned-import

const axios = require('axios');
const { createError } = require('micro');
const errors = require('./errors');

const BASE_URL = 'https://maps.googleapis.com/maps/api/place';

const handleResponse = ({ data }) => {
  if (errors[data.status]) {
    const error = errors[data.status];
    throw createError(error.code, error.message);
  }

  return data;
};

module.exports = (url, params) =>
  axios.get(`${BASE_URL}${url}/json`, { params: { key: process.env.GOOGLE_API_KEY, ...params } }).then(handleResponse);
