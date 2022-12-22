const { Block, Transaction } = require("../mongoDb/models");

const PAGE_CONTENTS_SIZE = 50;

const router = require("express").Router();

const { response } = require("../util/serverUtil");

router.get("/blocks/:page/", async (req, res) => {
  try {
    const { page } = req.params;
    const offsetContents = PAGE_CONTENTS_SIZE * (page - 1);
    if (offsetContents < 0) throw new Error("페이지는 음수가 될 수 없다구욧");
    const blocks = await Block.findAll()
      .limit(PAGE_CONTENTS_SIZE)
      .skip(offsetContents)
      .sort({ _id: -1 });
    if (blocks.length === 0)
      throw new Error("이 페이지에 해당하는 데이터가 없다구욧");
    return response(res, 200, true, blocks);
  } catch (error) {
    return response(res, 404, false, false, error);
  }
});

router.get("/blockscount", async (req, res) => {
  try {
    const count = await Block.count("_id");
    return response(res, 200, true, count);
  } catch (error) {
    return response(res, 404, false, false, error);
  }
});

router.get("/transaction/:page/", async (req, res) => {
  try {
    const { page } = req.params;
    const offsetContents = PAGE_CONTENTS_SIZE * (page - 1);

    if (offsetContents < 0) throw new Error("페이지는 음수가 될 수 없다구욧");

    const transaction = await Transaction.findAll()
      .limit(PAGE_CONTENTS_SIZE)
      .skip(offsetContents)
      .sort({ _id: -1 });

    if (transaction.length === 0)
      throw new Error("이 페이지에 해당하는 데이터가 없다구욧");

    return response(res, 200, true, transaction);
  } catch (error) {
    return response(res, 404, false, false, error);
  }
});

router.get("/transactioncount", async (req, res) => {
  try {
    const count = await Transaction.count("_id");
    return response(res, 200, true, count);
  } catch (error) {
    return response(res, 404, false, false, error);
  }
});

// router.get("/transaction/:id", async (req, res) => {
//   const { id } = req.params;
//   return res.sendFile(process.cwd() + `\\images\\${id}.jpg`);
// });

// router.get("/metadatas/:id", async (req, res) => {
//   const { id } = req.params;
//   res.sendFile(process.cwd() + `\\metadatas\\${id}.json`);
// });

// router.get("/images/:id", async (req, res) => {
//   const { id } = req.params;
//   return res.sendFile(process.cwd() + `\\images\\${id}.jpg`);
// });

module.exports = router;
