const mongoDb = require("mongoose");
const { Schema } = mongoDb;

const { convertLogs } = require("../../util/dbUtil");

const logsSchema = new Schema({
  logIndex: { type: String },
  transactionIndex: { type: String },
  transactionHash: { type: String, index: true },
  blockHash: { type: String },
  blockNumber: { type: String },
  address: { type: String },
  type: { type: String },
  id: { type: String },
  returnValues: [],
  logs: [],
  event: { type: String },
  signature: { type: String },
  raw: [],
});

logsSchema.statics.insertlogss = function (logss) {
  return this.insertMany(logss);
};

logsSchema.statics.insertLogs = async function (logs) {
  return this.create(logs);
};

logsSchema.statics.findByTransactionHash = async function (transactionHash) {
  const resultLogs = await this.find({ transactionHash });
  return convertLogs(resultLogs);
};

logsSchema.statics.findAll = async function () {
  const resultLogs = await this.find({});
  return convertLogs(resultLogs);
};

logsSchema.statics.deleteAll = function () {
  return this.deleteMany({});
};

const Logs = mongoDb.model("logs", logsSchema);

module.exports = { Logs, logsSchema };
