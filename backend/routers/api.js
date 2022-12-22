const router = require("express").Router();

// router.get("/metadatas/:id", async (req, res) => {
//   const { id } = req.params;
//   res.sendFile(process.cwd() + `\\metadatas\\${id}.json`);
// });

// router.get("/images/:id", async (req, res) => {
//   const { id } = req.params;
//   return res.sendFile(process.cwd() + `\\images\\${id}.jpg`);
// });

router.get("/block/:page", async (req, res) => {
  const { page } = req.params;
  return res.send(page);
});

// router.get("/transaction/:id", async (req, res) => {
//   const { id } = req.params;
//   return res.sendFile(process.cwd() + `\\images\\${id}.jpg`);
// });

module.exports = router;
