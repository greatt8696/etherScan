const { Block, Transaction } = require("../mongoDb/models");

const router = require("express").Router();

const { response } = require("../util/serverUtil");

const contractJson = require("../../solidity/artifacts/TestTransition.json");
const { CA } = require("../../solidity");

const { minting } = require("../jsonGenerator/generateEquipJson");

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

router.get("/:nftName/metadata/:tokenId", async (req, res) => {
  const { nftName, tokenId } = req.params;
  return res.sendFile(
    process.cwd() + `\\nftAssets\\${nftName}\\metadata\\${tokenId}.json`
  );
});

router.get("/:nftName/image/:tokenId", async (req, res) => {
  const { nftName, tokenId } = req.params;
  return res.sendFile(
    process.cwd() + `\\nftAssets\\${nftName}\\original\\${tokenId}`
  );
});

router.get("/equipNft/miniting/:minitngSize", async (req, res) => {
  try {
    const { minitngSize } = req.params;
    return response(res, 200, true, minting(5, minitngSize));
  } catch (error) {
    return response(res, 404, false, false, error);
  }
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
