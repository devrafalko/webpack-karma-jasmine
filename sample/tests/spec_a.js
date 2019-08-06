import myModule from './../src/index.js';

describe("Module should return", function () {
  it("some number", function () {
    expect(myModule()).toEqual(10);
  });
});