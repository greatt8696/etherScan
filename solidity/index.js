const CAs = [
  "0x43F2F33775f591E4D60393e7E74264d65Fb0A0F6",
  "0xf8e81D47203A594245E36C48e151709F0C19fBe8",
  "0xD7ACd2a9FD159E69Bb102A1ca21C9a3e3A5F771B",
  "0x7EF2e0048f5bAeDe046f6BF797943daF4ED8CB47"
];
const Contracts = [
  require("./artifacts/TestTransition.json"),
  require("./artifacts/nftExchanger.json"),
  require("./artifacts/UnitToken.json"),
  require("./artifacts/EqiupToken.json"),
];

module.exports = { CAs, Contracts };
