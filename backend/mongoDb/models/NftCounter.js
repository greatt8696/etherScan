const mongoDb = require("mongoose");
const { Schema } = mongoDb;

const nftCounterSchema = new Schema({
  _id: { type: Number, index: true, unique: true },
  counter: { type: Number, default: 0 },
});

nftCounterSchema.statics.initCounter = async function () {
  return this.create({ _id: 0, counter: 0 });
};
nftCounterSchema.statics.increase = async function (value = 1) {
  return this.findOneAndUpdate({ _id: 0 }, { $inc: { counter: value } });
};
nftCounterSchema.statics.decrease = async function (value = 1) {
  return this.findByIdAndUpdate({ _id: 0 }, { $dec: { counter: value } });
};
nftCounterSchema.statics.setCounter = async function (value) {
  return this.findByIdAndUpdate({ _id: 0 }, { counter: value });
};
nftCounterSchema.statics.getCounter = async function () {
  return this.findOne({ _id: 0 });
};

const NftCounter = mongoDb.model("nftCounter", nftCounterSchema);

module.exports = { NftCounter, nftCounterSchema };
