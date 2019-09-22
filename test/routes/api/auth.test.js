const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const server = require("../../../server");
const { setupDB, shutdown } = require("../../../config/db");

chai.use(chaiHttp);

describe("Token", done => {
  before(async () => {
    await setupDB();
  });

  after(async () => {
    await shutdown();
  });

  it("Should return a token", async () => {
    try {
      const res = await chai
        .request(server)
        .post("/api/auth/")
        .send({
          name: process.env.INITIAL_ADMIN_USERNAME,
          password: process.env.INITIAL_ADMIN_PASSWORD
        });
      return expect(res.status).to.equal(200);
    } catch (err) {
      console.error(err);
      return err;
    }
  });
});
