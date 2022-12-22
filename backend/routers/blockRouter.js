const { Block } = require("../mongoDb/models");

const PAGE_CONTENTS_SIZE = 50;

const router = require("express").Router();

const { response } = require("../util/serverUtil");

router.get("/count/", async (req, res) => {
  try {
    const count = await Block.count("_id");
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

router.get("/:id/", async (req, res) => {
  try {
    const { id } = req.params;
    const block = await Block.find({ number: id });
    if (block.length === 0)
      throw new Error("이 블록넘버에 해당하는 데이터가 없다구욧");
    return response(res, 200, true, block);
  } catch (error) {
    return response(res, 404, false, false, error);
  }
});

module.exports = router;
