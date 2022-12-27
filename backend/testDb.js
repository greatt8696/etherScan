const {
  connectDb,
  initDb,
  Block,
  Transaction,
  Logs,
  NftCounter,
} = require("./mongoDb/models/index");

const firebase = require("firebase/app")(async () => {
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

  // const block = await Block.find({ number: 5 });
  // console.log(block);

  // const counter = await NftCounter.initCounter();
  // console.log(counter);
  // await NftCounter.increase();
  // console.log(await NftCounter.getCounter());
})();

connectDb().then(async () => {
  // const counter = await NftCounter.initCounter();
  // console.log(await NftCounter.increase());
  // console.log(await NftCounter.increase());
  // console.log(await NftCounter.increase());
  // console.log(await NftCounter.setCounter(5));
  // console.log(await NftCounter.getCounter());
});
