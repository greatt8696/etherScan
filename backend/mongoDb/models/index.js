require("dotenv").config();

const mongoDb = require("mongoose");
const { Block } = require("./Block");
const { Transaction } = require("./Transaction");
const { Logs } = require("./Logs");
const { Nft } = require("./Nft");
const initDb = async (web3Manager) => {
  await Block.deleteAll();
  console.log("Block.deleteAll : Success");
  await Transaction.deleteAll();
  console.log("Transaction.deleteAll : Success");
  const blocks = await initBlocks(web3Manager);
  console.log("init blocks : success, length: ", blocks.length);
  const transactions = await initTransactions(blocks);
  console.log("init transactions : success, length: ", transactions.length);
};

const initBlocks = async (web3Manager) => {
  // console.log(web3Manager.getAllBlocks);
  const blocks = await web3Manager.getAllBlocks();
  await Block.insertBlocks(blocks);
  return blocks;
};

const initTransactions = async (blocks) => {
  const transactionsArray = [];
  blocks.forEach(({ transactions }) => {
    const transactionsInBlock = transactions;
    transactionsInBlock.forEach((transaction) =>
      transactionsArray.push(transaction)
    );
  });
  await Transaction.insertTransactions(transactionsArray);
  return transactionsArray;
};

const connectDb = async function () {
  mongoDb.set("strictQuery", true);
  return mongoDb.connect("mongodb://127.0.0.1:27017");
};

module.exports = { connectDb, initDb, Block, Transaction, Logs, Nft };
