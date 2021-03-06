# When To Call

[![CircleCI](https://img.shields.io/circleci/project/github/jamesacarr/when-to-call-api.svg)](https://circleci.com/gh/jamesacarr/when-to-call-api)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![XO code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

## Description

When To Call is a service that allows users to search for any business around the world. When To Call will then give the user a time-range for when both they and the business are within business hours (8:30am - 5:00pm) in order to organise a call or meeting. This is the backend API for the When To Call service which facilitates communication between the web client and the [Google Places API](https://developers.google.com/places/web-service/)

## Running the code

### Development

1. Open the cmd line to the main directory and run `yarn dev`
2. The API should now be available at http://localhost:3001
2. Start developing!

The development environment includes hot reloading of all applications (api, router, web) so any changes are reflected immediately in the browser/API.

### Production

1. Open the cmd line to the main directory and run `yarn build && yarn start`
2. The API should now be available at http://localhost:3000
3. Start querying the Places API

## Contributing

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device
2. Install the dependencies with `yarn install`
3. Create a [pull request](https://help.github.com/articles/about-pull-requests/) with your changes when ready

You can run the [Jest](https://github.com/facebook/jest) test by using `yarn test` and the [XO](https://github.com/sindresorhus/xo) metrics by using: `yarn metrics`

## License

MIT © James Carr