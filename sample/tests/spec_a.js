const myModule = require('./../src/index.js');
describe("Module should return", function () {
  it("some number", function () {
    expect(myModule()).toEqual(10);
  });
});