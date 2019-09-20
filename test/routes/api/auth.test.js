const expect = require("chai").expect;

describe("Authentication", () => {
  // TODO: Implement these using `fetch`
  it("Succeeds when requester is admin", () => {});
  it("Returns user details where requester is admin", () => {});
  it("Succeeds when requester is the same user but not an admin", () => {});
  it("Returns user details where requester is the same user but not an admin", () => {});
  it("Fails when user does not exist", () => {});
  it("Fails when requester is not signed in", done => {
    done();
  });
  it("Does not return user details where requester is not admin or the user being viewed", () => {});
  it("Logs in successfully", () => {});
  it("Fails login on incorrect username", () => {});
  it("Fails login on incorrect password", () => {});
});
