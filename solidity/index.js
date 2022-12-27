const CAs = [
  "0x43F2F33775f591E4D60393e7E74264d65Fb0A0F6",
  "0xd9145CCE52D386f254917e481eB44e9943F39138",
  "0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8",
  "0xf8e81D47203A594245E36C48e151709F0C19fBe8",
];
const Contracts = [
  require("./artifacts/TestTransition.json"),
  require("./artifacts/nftExchanger.json"),
  require("./artifacts/UnitToken.json"),
  require("./artifacts/EquipToken.json"),
];

module.exports = { CAs, Contracts };

const goerily = [
  "0xA71796f9C246130333dd311B603ed50f26000d2d", // nftExchanger
  "0x23647a074a1B6d639C7c3F1A447763Cfbf7aa65c", // uint
];
