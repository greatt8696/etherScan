const { Block, Transaction } = require("../mongoDb/models");

const router = require("express").Router();

const { response } = require("../util/serverUtil");

const contractJson = require("../../solidity/artifacts/TestTransition.json");
const { CA } = require("../../solidity");

router.get("/getContractJson", async (req, res) => {
  try {
    return response(res, 200, true, contractJson);
  } catch (error) {
    return response(res, 404, false, false, error);
  }
});

router.get("/getCA", async (req, res) => {
  try {
    return response(res, 200, true, CA);
  } catch (error) {
    return response(res, 404, false, false, error);
  }
});

router.get("/:nftName/getMetadatas", async (req, res) => {
  const { nftName } = req.params;
  return res.sendFile(process.cwd() + `\\nft\\${nftName}\\metadata\\test.text`);
});

// router.get("/metadatas/:id", async (req, res) => {
//   const { id } = req.params;
//   res.sendFile(process.cwd() + `\\metadatas\\${id}.json`);
// });

// router.get("/images/:id", async (req, res) => {
//   const { id } = req.params;
//   return res.sendFile(process.cwd() + `\\images\\${id}.jpg`);
// });

module.exports = router;
