const request = require("supertest");
const app = require("../../../server");
const User = require("../../../models/User");
const jwt = require("jsonwebtoken");
const mockingoose = require("mockingoose").default;
const expect = require("chai").expect;

describe("User tests", () => {
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
    expect(res.status).to.be.equal(201);
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
    expect(res.status).to.be.equal(403);
  });

  it("should fail with short password", async () => {
    // Mock out Mongoose methods
    const userToReturn = new User({
      name: "somethign",
      isAdmin: true,
      password: "firstHash",
      token: "tokentoken.tokeny.sig"
    });

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
    expect(res.status).to.be.equal(400);
  });

  it("should fail with no name", async () => {
    // Mock out Mongoose methods
    const userToReturn = new User({
      name: "somethign",
      isAdmin: true,
      password: "firstHash",
      token: "tokentoken.tokeny.sig"
    });

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
      .send({ name: "", password: "mockPw222333444555" });
    expect(res.status).to.be.equal(400);
  });

  it("should get all users", async () => {
    // Mock out Mongoose methods
    const userToReturn = new User({
      name: "somethign",
      isAdmin: true,
      password: "firstHash",
      token: "tokentoken.tokeny.sig"
    });

    // Mock out Mongoose methods
    const usersList = [
      new User({
        name: "somethign",
        isAdmin: true,
        token: "tokentoken.tokeny.sig"
      }),
      new User({
        name: "something",
        isAdmin: false,
        token: "tokentoken.tokeny.sig"
      })
    ];

    // This allows us to return different things from the mock, based on the user for whom the query is looking
    const finderMock = query => {
      if (query.getQuery().name === "somethign") {
        return userToReturn;
      } else if (query.getQuery().name === "other thing") {
        return null;
      } else {
        return userToReturn;
      }
    };

    mockingoose(User).toReturn({ _id: "id" }, "save");
    mockingoose(User).toReturn(finderMock, "findOne");
    mockingoose(User).toReturn(usersList, "find");

    // Also mock out the jwt hash-comparison; this returns a successful result
    jest
      .spyOn(jwt, "verify")
      .mockImplementationOnce((jwt, key, cb) => cb(null, { user: { id: "id2", name: "somethign" } }));

    const res = await request(app)
      .get("/api/users/")
      .set("Authorization", "Bearer tokentoken.tokeny.sig");
    expect(res.status).to.be.equal(200);
    expect(res.body.allUsers[0]).to.not.have.property("password");
  });
});
