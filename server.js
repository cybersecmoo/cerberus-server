const express = require("express");

require("dotenv").config();

const app = express();

app.use(express.json({ extended: false }));

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/networkmaps", require("./routes/api/networkmap"));
app.use("/api/heartbeat", require("./routes/api/heartbeat"));
app.use("/api/command", require("./routes/api/command"));

module.exports = app;
