const request = require("supertest");
const app = require("../../../server");
const User = require("../../../models/User");
const bcrypt = require("bcryptjs");
const mockingoose = require("mockingoose").default;

describe("Auth tests", () => {
  afterEach(() => {
    mockingoose.resetAll();
    jest.restoreAllMocks();
  });

  it("should return a token", async () => {
    // Mock out Mongoose methods
    const userToReturn = new User({ name: "somethign", isAdmin: false, password: "firstHash" });
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

  it("should return a 400 status for User not found", async () => {
    // Mock out Mongoose methods
    mockingoose(User).toReturn(null, "findOne");
    mockingoose(User).toReturn({ _id: "id" }, "save");

    // Also mock out the password hash-comparison; this returns a successful result
    jest.spyOn(bcrypt, "compare").mockImplementation((hash, otherHash) => Promise.resolve(true));

    const res = await request(app)
      .post("/api/auth/")
      .send({ name: "somethign", password: "mockPW" });
    expect(res.status).toEqual(400);
  });

  it("should return a 400 status for non-matching passwords", async () => {
    // Mock out Mongoose methods
    const userToReturn = new User({ name: "somethign", isAdmin: false, password: "thirdHash" });
    mockingoose(User).toReturn(userToReturn, "findOne");
    mockingoose(User).toReturn({ _id: "id" }, "save");

    // Also mock out the password hash-comparison; this returns a successful result
    jest.spyOn(bcrypt, "compare").mockImplementation((hash, otherHash) => {
      return new Promise(function(resolve, reject) {
        reject(new Error("No Match"));
        return;
      });
    });

    const res = await request(app)
      .post("/api/auth/")
      .send({ name: "somethign", password: "mockPW" });
    expect(res.status).toEqual(400);
  });
});
