const router = require("express").Router();
const tempBlocks = require("../blocks");
const event = require("../events");

router.get("/metadatas/:id", async (req, res) => {
  const { id } = req.params;
  res.sendFile(process.cwd() + `\\metadatas\\${id}.json`);
});

router.get("/images/:id", async (req, res) => {
  const { id } = req.params;
  return res.sendFile(process.cwd() + `\\images\\${id}.jpg`);
});

module.exports = router;
