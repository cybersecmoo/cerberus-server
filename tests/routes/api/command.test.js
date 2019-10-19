const request = require("supertest");
const app = require("../../../server");
const User = require("../../../models/User");
const CommandType = require("../../../models/CommandType");
const jwt = require("jsonwebtoken");
const mockingoose = require("mockingoose").default;
const expect = require("chai").expect;

describe("Command tests", () => {
  afterEach(() => {
    mockingoose.resetAll();
    jest.restoreAllMocks();
  });

  it("should create a command type", async () => {
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
    mockingoose(Command).toReturn({ _id: "id" }, "save");

    // Also mock out the jwt hash-comparison; this returns a successful result
    jest
      .spyOn(jwt, "verify")
      .mockImplementationOnce((jwt, key, cb) => cb(null, { user: { id: "id2", name: "somethign" } }));

    const res = await request(app)
      .post("/api/commands/types/")
      .set("Authorization", "Bearer tokentoken.tokeny.sig")
      .send({ name: "other thing", argsCount: 2 });
    expect(res.status).to.be.equal(201);
  });

  it("should fail with negative argsCount", async () => {
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
    mockingoose(CommandType).toReturn({ _id: "id" }, "save");

    // Also mock out the jwt hash-comparison; this returns a successful result
    jest
      .spyOn(jwt, "verify")
      .mockImplementationOnce((jwt, key, cb) => cb(null, { user: { id: "id2", name: "somethign" } }));

    const res = await request(app)
      .post("/api/commands/types/")
      .set("Authorization", "Bearer tokentoken.tokeny.sig")
      .send({ name: "other thing", argsCount: -3 });
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
    mockingoose(CommandType).toReturn({ _id: "id" }, "save");

    // Also mock out the jwt hash-comparison; this returns a successful result
    jest
      .spyOn(jwt, "verify")
      .mockImplementationOnce((jwt, key, cb) => cb(null, { user: { id: "id2", name: "somethign" } }));

    const res = await request(app)
      .post("/api/commands/types/")
      .set("Authorization", "Bearer tokentoken.tokeny.sig")
      .send({ name: "", argsCount: 0 });
    expect(res.status).to.be.equal(400);
  });

  it("should get all command types", async () => {
    // Mock out Mongoose methods
    const userToReturn = new User({
      name: "somethign",
      isAdmin: true,
      password: "firstHash",
      token: "tokentoken.tokeny.sig"
    });

    // Mock out Mongoose methods
    const commandTypesList = [
      new CommandType({
        name: "somethign",
        argsCount: 1
      }),
      new CommandType({
        name: "something",
        argsCount: 2
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

    mockingoose(CommandType).toReturn({ _id: "id" }, "save");
    mockingoose(User).toReturn(finderMock, "findOne");
    mockingoose(CommandType).toReturn(commandTypesList, "find");

    // Also mock out the jwt hash-comparison; this returns a successful result
    jest
      .spyOn(jwt, "verify")
      .mockImplementationOnce((jwt, key, cb) => cb(null, { user: { id: "id2", name: "somethign" } }));

    const res = await request(app)
      .get("/api/commands/types/")
      .set("Authorization", "Bearer tokentoken.tokeny.sig");
    expect(res.status).to.be.equal(200);
  });
});
