require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const api = require("./routers/api");
const { blockRouter, transactionRouter, logsRouter, nftRouter } = require("./routers");
const {
  connectDb,
  initDb,
  Transaction,
  Block,
  Logs,
} = require("./mongoDb/models");
const { Web3Manager } = require("./web3/web3Manager");
const { SERVER_PORT } = process.env;

const { CAs, Contracts } = require("../solidity");

(async () => {
  connectDb();
  const web3Manager = new Web3Manager({ networkName: "ganache" });
  try {
    await web3Manager.init();
    await web3Manager.setContracts(CAs, Contracts);
    const instances = web3Manager.getContractInstances();
    const addLogsToDB = async (logs) => await Logs.insertlogss(logs);

    const addBlockAndTransactionToDB = async () => {
      const completedBlock = await web3Manager.getWeb3Eth().getBlock("latest");
      await Block.insertBlock(completedBlock);
      const newTransaction = await web3Manager
        .getWeb3Eth()
        .getTransactionFromBlock(completedBlock.hash);
      await Transaction.insertTransaction(newTransaction);
    };

    web3Manager
      .subscribeNewBlockEvent(addBlockAndTransactionToDB)
      .subscribeTransationEvent(instances, addLogsToDB)
    //  .initTransaction();
    //.startTransactionBot();

    /*  체이닝
        web3Manager.subscribeNewBlockEvent(addBlockAndTransactionToDB)
                   .subscribeTransationEvent(instance, addLogsToDB)
                   .initTransaction()
                   .startTransactionBot();
        -----------------------------------------------
        web3Manager.subscribeNewBlockEvent(addBlockAndTransactionToDB);
        web3Manager.subscribeTransationEvent(instance, addLogsToDB);
        web3Manager.initTransaction();
        web3Manager.startTransactionBot();
        -----------------------------------------------
    */
  } catch (error) {
    console.error(error);
  }
})();

app.use(cors({ origin: "*", credentials: false }));

app.use(express.static("public"));

app.listen(SERVER_PORT, () => console.log("SERVER RUNNING :", SERVER_PORT));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/api", api);

app.use("/block", blockRouter);

app.use("/transaction", transactionRouter);

app.use("/logs", logsRouter);

app.use("/nft", nftRouter);
