const mongoose = require("mongoose");
const initAdmin = require("./init_admin");
const seed = require("./seed");

const connectDB = async () => {
  try {
    console.log("Connecting to DB...");
    const connectString = encodeURI(process.env.DB_URI);
    await mongoose.connect(connectString, { useNewUrlParser: true });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const setupDB = async () => {
  await connectDB();
  await initAdmin();
  await seed();
};

const shutdown = async () => {
  await mongoose.disconnect();
};

module.exports = { setupDB, shutdown };
