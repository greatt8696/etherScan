require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const api = require("./routers/api");
const { blockRouter, transactionRouter, logsRouter } = require("./routers");
const { connectDb, initDb } = require("./mongoDb/models");
const { Web3Manager } = require("./web3/web3Manager");
const { SERVER_PORT } = process.env;

const CA = "0x8FFB42137432a68f2fD73727381E330A530a923b";
const Contract = require("../solidity/artifacts/TestTransition.json");

(async () => {
  connectDb();
  const web3Manager = new Web3Manager({ networkName: "ganache" });
  try {
    await web3Manager.init();
    await web3Manager.setContract(CA, Contract);
    const instance = web3Manager.getContractInstance();
    web3Manager.subscribeNewBlockEvent();
    web3Manager.subscribeTransationEvent(instance);
    web3Manager.initTransaction();
    web3Manager.autoContractTanscation();
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

