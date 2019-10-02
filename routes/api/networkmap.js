const NetworkMap = require("../../models/NetworkMap");
const express = require("express");
const router = express.Router();
const { standardAuth } = require("../../middleware/auth");

// Save a network map
router.post("/", standardAuth, async (req, res) => {
  const { name, ipRange, nodes, links } = req.body;
  let netMap = await NetworkMap.findOne({ name: name });

  if (!netMap) {
    netMap = new NetworkMap({
      name,
      ipRange,
      nodes,
      links
    });
  } else {
    netMap.ipRange = ipRange;
    netMap.nodes = nodes;
    netMap.links = links;
  }

  await netMap.save();

  return res.json(netMap);
});

// Get all network maps
router.get("/", standardAuth, async (req, res) => {
  const maps = await NetworkMap.find({});

  res.json(maps);
});

module.exports = router;
