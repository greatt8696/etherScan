const mongoDb = require("mongoose");
const { Schema } = mongoDb;

const logsSchema = new Schema({
  logIndex: { type: String },
  transactionIndex: { type: String },
  transactionHash: { type: String },
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
  // if (logs === null) return;
  // const isExist = await this.find({ hash: logs.hash });
  // if (!!isExist.length) {
  //   console.log("logsSchema.statics.insertlogs: isExist", isExist);
  //   return;
  // }
  // console.log("newlogs", logs);
  return this.create(logs);
};

logsSchema.statics.findAll = function () {
  return this.find({});
};

logsSchema.statics.deleteAll = function () {
  return this.deleteMany({});
};

logsSchema.statics.findByHash = function (hash) {
  return this.find({ hash });
};

const Logs = mongoDb.model("logs", logsSchema);

module.exports = { Logs, logsSchema };
