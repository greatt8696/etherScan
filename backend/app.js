require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const api = require("./routers/api");
const { blockRouter, transactionRouter, logsRouter } = require("./routers");
const { connectDb, initDb } = require("./mongoDb/models");
const { TransactionManager } = require("./web3/web3Manager");
const { SERVER_PORT } = process.env;

//mongoDb 실행

(async () => {
  connectDb();
  const transactionManager = new TransactionManager({ isTestNet: false });
  await transactionManager.init();
  try {
    transactionManager.subscribeAllEvent();
    transactionManager.initTransaction();
    transactionManager.autoContractTanscation();
  } catch (error) {
    console.log(error);
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
