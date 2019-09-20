const expect = require("chai").expect;
const User = require("../../models/User");

describe("User Validation", () => {
  it("Should be invalid if username not provided", done => {
    const user = new User({ password: "sadlkfha" });
    user.validate(err => {
      expect(err.errors.name).to.exist;
      done();
    });
  });
  it("Should be invalid if password not provided", done => {
    const user = new User({ name: "alskdj" });
    user.validate(err => {
      expect(err.errors.password).to.exist;
      done();
    });
  });
  it("Should be valid", done => {
    const user = new User({ name: "alskdj", password: "s,kdahf" });
    user.validate(err => {
      expect(err).to.be.null;
      done();
    });
  });
});
