const express = require("express");
const connectDB = require("./config/db");
const seedDB = require("./config/seed");
const setupInitialAdmin = require("./config/init_admin");

require("dotenv").config();

const app = express();
connectDB();
seedDB();
setupInitialAdmin();

app.use(express.json({ extended: false }));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/networkmaps", require("./routes/api/networkmap"));
app.use("/api/heartbeat", require("./routes/api/heartbeat"));
app.use("/api/command", require("./routes/api/command"));

const PORT = process.env.PORT || 5000;

app.listen(PORT);
