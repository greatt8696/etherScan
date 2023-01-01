const {
  connectDb,
  initDb,
  Block,
  Transaction,
  Logs,
  NftCounter,
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

const json = {
  image: "https://epiccar-nft.renaultkoream.com/image/2842.png",
  description:
    "Epic Car Collection I is the first NFT of Renault Korea Motors. It has been designed and made by the owner resulting in many unique and different kinds of NFTs. Holder utilities and benefits are going to come soon.",
  name: "Epic Car Collection I No.2842",
  external_url: "",
  animation_url: "https://epiccar-nft.renaultkoream.com/cars/2842",
  attributes: [
    { trait_type: "body", value: "Body - XM3" },
    { trait_type: "bonnet", value: "Bonnet - Futuristic Type_A" },
    { trait_type: "bumper", value: "Bumper - Motorsport Type_B" },
    { trait_type: "wheel", value: "Wheel - Offroad Type_B" },
    { trait_type: "headLight", value: "Headlight - Offroad Type_B" },
    { trait_type: "tailLamp", value: "Tail Lamp - Motorsport Type_C" },
    { trait_type: "roofCarrier", value: "Roofcarrier - Offroad Type" },
  ],
  color: { body_color: "#4e78f0", wheel_color: "#fff" },
};
