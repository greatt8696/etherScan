const mongoDb = require("mongoose");
const { transactionSchema } = require("./Transaction");
const { Schema } = mongoDb;

const blockSchema = new Schema({
  number: { type: Number, index: true, unique: true },
  hash: { type: String },
  parentHash: { type: String },
  mixHash: { type: String },
  nonce: { type: String },
  sha3Uncles: { type: String },
  logsBloom: { type: String },
  transactionsRoot: { type: String },
  stateRoot: { type: String },
  receiptsRoot: { type: String },
  miner: { type: String },
  difficulty: { type: String },
  totalDifficulty: { type: String },
  extraData: { type: String },
  size: { type: String },
  gasLimit: { type: String },
  gasUsed: { type: String },
  timestamp: { type: String },
  transactions: [transactionSchema],
  uncles: { type: Array },
});

blockSchema.statics.insertBlocks = function (blocks) {
  return this.insertMany(blocks);
};
blockSchema.statics.insertBlock = function (blocks) {
  return this.create(blocks);
};

blockSchema.statics.findAll = function () {
  return this.find({});
};

blockSchema.statics.deleteAll = function () {
  return this.deleteMany({});
};

const Block = mongoDb.model("block", blockSchema);

module.exports = { Block };
