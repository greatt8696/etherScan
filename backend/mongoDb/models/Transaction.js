const mongoDb = require("mongoose");
const { Schema } = mongoDb;

const transactionSchema = new Schema({
  hash: { type: String, index: true },
  nonce: { type: String },
  blockHash: { type: String },
  blockNumber: { type: String, index: true },
  transactionIndex: { type: String },
  from: { type: String },
  to: { type: String },
  value: { type: String },
  gas: { type: String },
  gasPrice: { type: String },
  input: { type: String },
  v: { type: String },
  r: { type: String },
  s: { type: String },
});

transactionSchema.statics.insertTransactions = function (transactions) {
  return this.insertMany(transactions);
};

transactionSchema.statics.insertTransaction = async function (transaction) {
  // console.log("@@@@@@@@@@@@@@@@", transaction);
  if (transaction === null) return;
  const isExist = await this.find({ hash: transaction.hash });
  console.log("hash@@@@@@@@@@@@@@@@@@", transaction.hash);
  if (!!isExist.length) {
    console.log(
      "transactionSchema.statics.insertTransaction: isExist",
      isExist
    );
    return;
  }
  console.log("newTransaction", transaction);
  return this.create(transaction);
};

transactionSchema.statics.findAll = function () {
  return this.find({});
};

transactionSchema.statics.deleteAll = function () {
  return this.deleteMany({});
};

transactionSchema.statics.findByHash = function (hash) {
  return this.find({ hash });
};

const Transaction = mongoDb.model("transaction", transactionSchema);

module.exports = { Transaction, transactionSchema };
