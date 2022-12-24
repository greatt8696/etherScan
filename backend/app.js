require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const api = require("./routers/api");
const { blockRouter, transactionRouter, logsRouter } = require("./routers");
const {
  connectDb,
  initDb,
  Transaction,
  Block,
  Logs,
} = require("./mongoDb/models");
const { Web3Manager } = require("./web3/web3Manager");
const { SERVER_PORT } = process.env;

const CA = "0x370F34e6f81777daBdEfFb8CC4Dc86ba4Df9B882";
const Contract = require("../solidity/artifacts/TestTransition.json");

(async () => {
  connectDb();
  const web3Manager = new Web3Manager({ networkName: "ganache" });
  try {
    await web3Manager.init();
    await web3Manager.setContract(CA, Contract);
    const instance = web3Manager.getContractInstance();
    web3Manager
      .subscribeTransationEvent(
        instance,
        async (result) => await Logs.insertlogss(result)
      )
      .subscribeNewBlockEvent(async (result) => {
        await Block.insertBlock(result);
        const newTransaction = await web3Manager
          .getWeb3Eth()
          .getTransactionFromBlock(result.hash);
        await Transaction.insertTransaction(newTransaction);
      })
      .initTransaction()
      .startTransactionBot();

    //  체이닝을 쓰지 않은 경우
    //  web3Manager.subscribeNewBlockEvent();
    //  web3Manager.subscribeTransationEvent(instance);
    //  web3Manager.initTransaction();
    //  web3Manager.startTransactionBot();
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
