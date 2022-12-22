const { Transaction } = require("../mongoDb/models");

const PAGE_CONTENTS_SIZE = 50;

const router = require("express").Router();

const { response } = require("../util/serverUtil");

router.get("/count/", async (req, res) => {
  try {
    const count = await Transaction.count("_id");
    return response(res, 200, true, count);
  } catch (error) {
    return response(res, 404, false, false, error);
  }
});

router.get("/page/:page/", async (req, res) => {
  try {
    const { page } = req.params;
    const offsetContents = PAGE_CONTENTS_SIZE * (page - 1);
    if (offsetContents < 0) throw new Error("페이지는 음수가 될 수 없다구욧");
    const transactions = await Transaction.findAll()
      .limit(PAGE_CONTENTS_SIZE)
      .skip(offsetContents)
      .sort({ _id: -1 });
    if (transactions.length === 0)
      throw new Error("이 페이지에 해당하는 트랜잭션이 없다구욧");
    return response(res, 200, true, transactions);
  } catch (error) {
    return response(res, 404, false, false, error);
  }
});

router.get("/searchByHash/:hash/", async (req, res) => {
  try {
    const { hash } = req.params;
    const transaction = await Transaction.find({ hash });
    if (transaction.length === 0)
      throw new Error("이 해시에 해당하는 트랜잭션이 없다구욧");
    return response(res, 200, true, transaction);
  } catch (error) {
    return response(res, 404, false, false, error);
  }
});

router.get("/searchByBlockNumber/:blockNumber/", async (req, res) => {
  try {
    const { blockNumber } = req.params;
    const transaction = await Transaction.find({ blockNumber });
    if (transaction.length === 0)
      throw new Error("이 블록넘버에 해당하는 트랜잭션이 없다구욧");
    return response(res, 200, true, transaction);
  } catch (error) {
    return response(res, 404, false, false, error);
  }
});
router.get("/searchByblockHash/:blockHash/", async (req, res) => {
  try {
    const { blockHash } = req.params;
    const transaction = await Transaction.find({ blockHash });
    if (transaction.length === 0)
      throw new Error("이 블록해시에 해당하는 트랜잭션이 없다구욧");
    return response(res, 200, true, transaction);
  } catch (error) {
    return response(res, 404, false, false, error);
  }
});

module.exports = router;
