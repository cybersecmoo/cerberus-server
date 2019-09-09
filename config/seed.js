const CommandType = require("../models/CommandType");

const seedCmdTypes = async () => {
  const types = [
    { name: "SFTP", argsCount: 2 }, // ARGS: file to copy, destination
    { name: "OPEN_TUNNEL", argsCount: 3 }, // ARGS: localPort, remoteHost, remotePort
    { name: "CLOSE_TUNNEL", argsCount: 2 }, // ARGS: remoteHost, remotePort (enough to uniquely ID a particular tunnel)
    { name: "SCREENSHOT", argsCount: 0 },
    { name: "SLEEP", argsCount: 1 } // ARGS: Set the time between heartbeats
  ];

  for (cmdType of types) {
    const existing = await CommandType.findOne({ name: cmdType.name });

    if (!existing) {
      const newType = new CommandType(cmdType);
      await newType.save();
    }
  }

  console.info("DB Seeded");
};

module.exports = seedCmdTypes;
