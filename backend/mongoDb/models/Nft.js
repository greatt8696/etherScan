const mongoDb = require("mongoose");
const { transactionSchema } = require("./Transaction");
const { Schema } = mongoDb;

const blockSchema = new Schema({
  address: { type: Number, index: true, unique: true },
  nftId: [{ type: Number, index: true }],
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

const Nft = mongoDb.model("nft", blockSchema);

module.exports = { Nft };
