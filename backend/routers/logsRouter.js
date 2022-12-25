const { Logs } = require("../mongoDb/models");

const router = require("express").Router();

const { response } = require("../util/serverUtil");

router.get("/count/", async (_, res) => {
  try {
    const count = await Logs.count("_id");
    return response(res, 200, true, count);
  } catch (error) {
    return response(res, 404, false, false, error);
  }
});

router.get("/searchByTransactionHash/:hash/", async (req, res) => {
  try {
    const { hash } = req.params;
    const log = await Logs.findByTransactionHash(hash);
    if (log.length === 0)
      throw new Error("이 해시에 해당하는 트랜잭션이 없다구욧");
    return response(res, 200, true, log);
  } catch (error) {
    return response(res, 404, false, false, error);
  }
});


module.exports = router;
