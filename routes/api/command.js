const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Command = require("../../models/Command");
const CommandType = require("../../models/CommandType");
const { standardAuth } = require("../../middleware/auth");
const logMessage = require("../../middleware/logging");

// Queue up a new command
router.post("/", standardAuth, async (req, res) => {
  const { type, args, targetID } = req.body;

  try {
    commandType = await CommandType.findOne({ name: type });

    if (!commandType) {
      res.status(400).json({ errors: [{ msg: "Command type not recognised" }] });
    } else {
      if (args.length != commandType.argCount) {
        res.status(400).json({ errors: [{ msg: "Incorrect number of arguments" }] });
      } else {
        com = new Command({
          type,
          args,
          targetID
        });
        await com.save();

        res.json(com);
      }
    }
  } catch (error) {
    logMessage("ERROR", "Failed to create command: " + error);
    res.status(500).json({ errors: [{ msg: "Failed to create command" }] });
  }
});

router.get("/types/", standardAuth, async (req, res) => {
  let jsonPayload = { allCommandTypes: [], errors: [] };
  let returnCode = 200;
  try {
    const allCommandTypes = await CommandType.find({});

    jsonPayload = { allCommandTypes, errors: jsonPayload.errors };
  } catch (error) {
    logMessage("ERROR", "Server error in getting command types: " + error);
    returnCode = 500;
    jsonPayload.errors = [{ msg: "Server Error" }];
  } finally {
    return res.status(returnCode).json(jsonPayload);
  }
});

// Create a new type of command
router.post(
  "/types/",
  standardAuth,
  [
    check("name", "Name is required")
      .not()
      .isEmpty()
      .trim()
      .escape(),
    check("argsCount", "Needs a non-negative number of arguments")
      .toInt()
      .custom(value => {
        return value >= 0;
      })
  ],
  async (req, res) => {
    let returnPayload = { commandType: {}, errors: [] };
    let returnCode = 200;
    const { name, argsCount } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty() || argsCount < 0) {
      returnCode = 400;
      returnPayload.errors = errors.array();
    } else {
      try {
        // Check that no commands with the same name already exist
        let commandType = await CommandType.findOne({ name });

        if (!commandType) {
          commandType = new CommandType({ name, argsCount });
          await commandType.save();

          returnCode = 201;
          returnPayload.errors = [];
          returnPayload.commandType = commandType;
        } else {
          returnCode = 400;
          returnPayload.errors = [{ msg: "A command type with that name already exists" }];
        }
      } catch (error) {
        logMessage("ERROR", "Failed to create command type: " + error);
        returnCode = 500;
        returnPayload.errors = [{ msg: "Failed to create command type" }];
      }
    }

    res.status(returnCode).json(returnPayload);
  }
);

router.delete("/types/:id", standardAuth, async (req, res) => {});

module.exports = router;
