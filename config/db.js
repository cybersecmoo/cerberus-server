const mongoose = require("mongoose");

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

module.exports = connectDB;
