const jestMock = require('jest-mock'); // eslint-disable-line import/no-extraneous-dependencies

class PromiseMocker extends jestMock.ModuleMocker {
  _defaultMockState() {
    return {
      promises: [],
      ...jestMock._defaultMockState(),
    };
  }
}

const promiseMock = new PromiseMocker();

const createMockPromise = () => {
  const mockFn = promiseMock.fn();

  mockFn.mockImplementation(() => {
    const promise = {};
    promise.promise = new Promise((resolve, reject) => {
      promise.resolve = resolve;
      promise.reject = reject;
    });

    mockFn.mock.promises.push(promise);

    return promise.promise;
  });

  return mockFn;
};

module.exports = {
  createMockPromise,
};
