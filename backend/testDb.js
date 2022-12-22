const {
  connectDb,
  initDb,
  Block,
  Transaction,
  Logs,
  Nft,
} = require("./mongoDb/models/index");

(async () => {
  await connectDb();

  // const page = 1;

  // const PAGE_CONTENTS_SIZE = 50;

  // const offsetContents = PAGE_CONTENTS_SIZE * (page - 1);

  // const blocks = await Block.findAll()
  //   .limit(PAGE_CONTENTS_SIZE)
  //   .skip(offsetContents)
  //   .sort({ _id: -1 });

  // console.log(Object.keys(Block.collection));
  // const size = await Block.count("_id");
  // console.log(size);

  const block = await Block.find({ number: 5 });
  console.log(block);
})();
