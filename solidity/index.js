const CAs = [
  "0x43F2F33775f591E4D60393e7E74264d65Fb0A0F6",
  "0xd9145CCE52D386f254917e481eB44e9943F39138",
  "0x358AA13c52544ECCEF6B0ADD0f801012ADAD5eE3",
  "0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8"
];
const Contracts = [
  require("./artifacts/TestTransition.json"),
  require("./artifacts/nftExchanger.json"),
  require("./artifacts/UnitToken.json"),
  require("./artifacts/EquipToken.json"),
];

module.exports = { CAs, Contracts };
