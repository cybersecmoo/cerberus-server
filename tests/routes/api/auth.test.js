const request = require("supertest");
const app = require("../../../server");
const User = require("../../../models/User");
const bcrypt = require("bcryptjs");
const mockingoose = require("mockingoose").default;

describe("Auth tests", () => {
  beforeEach(() => {
    mockingoose.resetAll();
    jest.clearAllMocks();
  });

  it("should return a token", async () => {
    // Mock out Mongoose methods
    const userToReturn = new User({ name: "somethign", isAdmin: false, password: "someHash" });
    mockingoose(User).toReturn(userToReturn, "findOne");
    mockingoose(User).toReturn({ _id: "id" }, "save");

    // Also mock out the password hash-comparison; this returns a successful result
    jest.spyOn(bcrypt, "compare").mockImplementationOnce((hash, otherHash) => Promise.resolve(true));

    const res = await request(app)
      .post("/api/auth/")
      .send({ name: "somethign", password: "mockPW" });
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });
});
