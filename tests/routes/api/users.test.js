const request = require("supertest");
const app = require("../../../server");
const User = require("../../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mockingoose = require("mockingoose").default;

describe("Auth tests", () => {
  afterEach(() => {
    mockingoose.resetAll();
    jest.restoreAllMocks();
  });

  it("should create a user", async () => {
    // Mock out Mongoose methods
    const userToReturn = new User({
      name: "somethign",
      isAdmin: true,
      password: "firstHash",
      token: "tokentoken.tokeny.sig"
    });
    const userToCreate = new User({ name: "other thing", isAdmin: false, password: "firstHash" });

    // This allows us to return different things from the mock, based on the user for whom the query is looking
    const finderMock = query => {
      if (query.getQuery().name === "somethign") {
        return userToReturn;
      } else if (query.getQuery().name === "other thing") {
        return null;
      } else if (query.getQuery()._id === "id2") {
        return userToReturn;
      }

      return userToReturn;
    };
    mockingoose(User).toReturn(finderMock, "findOne");
    mockingoose(User).toReturn({ _id: "id" }, "save");

    // Also mock out the jwt hash-comparison; this returns a successful result
    jest
      .spyOn(jwt, "verify")
      .mockImplementationOnce((jwt, key, cb) => cb(null, { user: { id: "id2", name: "somethign" } }));

    const res = await request(app)
      .post("/api/users/")
      .set("Authorization", "Bearer tokentoken.tokeny.sig")
      .send({ name: "other thing", password: "mockPW444555666" });
    expect(res.status).toEqual(201);
  });

  it("should fail with 403", async () => {
    // Mock out Mongoose methods
    const userToReturn = new User({
      name: "somethign",
      isAdmin: false,
      password: "firstHash",
      token: "tokentoken.tokeny.sig"
    });
    const userToCreate = new User({ name: "other thing", isAdmin: false, password: "firstHash" });

    // This allows us to return different things from the mock, based on the user for whom the query is looking
    const finderMock = query => {
      if (query.getQuery().name === "somethign") {
        return userToReturn;
      } else if (query.getQuery().name === "other thing") {
        return null;
      } else if (query.getQuery()._id === "id2") {
        return userToReturn;
      }

      return userToReturn;
    };
    mockingoose(User).toReturn(finderMock, "findOne");
    mockingoose(User).toReturn({ _id: "id" }, "save");

    // Also mock out the jwt hash-comparison; this returns a successful result
    jest
      .spyOn(jwt, "verify")
      .mockImplementationOnce((jwt, key, cb) => cb(null, { user: { id: "id2", name: "somethign" } }));

    const res = await request(app)
      .post("/api/users/")
      .set("Authorization", "Bearer tokentoken.tokeny.sig")
      .send({ name: "other thing", password: "mockPW444555666" });
    expect(res.status).toEqual(403);
  });

  it("should fail with short password", async () => {
    // Mock out Mongoose methods
    const userToReturn = new User({
      name: "somethign",
      isAdmin: true,
      password: "firstHash",
      token: "tokentoken.tokeny.sig"
    });
    const userToCreate = new User({ name: "other thing", isAdmin: false, password: "firstHash" });

    // This allows us to return different things from the mock, based on the user for whom the query is looking
    const finderMock = query => {
      if (query.getQuery().name === "somethign") {
        return userToReturn;
      } else if (query.getQuery().name === "other thing") {
        return null;
      } else if (query.getQuery()._id === "id2") {
        return userToReturn;
      }

      return userToReturn;
    };
    mockingoose(User).toReturn(finderMock, "findOne");
    mockingoose(User).toReturn({ _id: "id" }, "save");

    // Also mock out the jwt hash-comparison; this returns a successful result
    jest
      .spyOn(jwt, "verify")
      .mockImplementationOnce((jwt, key, cb) => cb(null, { user: { id: "id2", name: "somethign" } }));

    const res = await request(app)
      .post("/api/users/")
      .set("Authorization", "Bearer tokentoken.tokeny.sig")
      .send({ name: "other thing", password: "mockPw" });
    expect(res.status).toEqual(400);
  });
});
