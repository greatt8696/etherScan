require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const {
  blockRouter,
  transactionRouter,
  logsRouter,
  nftRouter,
} = require("./routers");
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
const { AlchemySubscription } = require("alchemy-sdk");

(async () => {
  connectDb();
  const web3Manager = new Web3Manager({ networkName: "goerli" });
  try {
    await web3Manager.init();
    await web3Manager.setContracts(CAs, Contracts);
    const instances = web3Manager.getContractInstances();
    const addLogsToDB = async (logs) => {
      return await Logs.insertlogss(logs);
    };

    // const addBlockAndTransactionToDB = async (result) => {
    //   const newBlock = await web3Manager.getWeb3Eth().getBlock(result.number);
    //   await Block.insertBlock(newBlock);

    //   const newTransactions = await web3Manager
    //     .getWeb3Eth()
    //     .getTransactionFromBlock(web3Manager.intToHex(result.number));
    //   await Transaction.insertTransactions(newTransactions);
    // };

    // web3Manager
    //   .subscribeNewBlockEvent(addBlockAndTransactionToDB)
    //   .subscribeTransationEvent(instances, addLogsToDB);
    // .initTransaction(instances[0])
    // .startTransactionBot(instances[0]);

    web3Manager.alchemy.ws.on("block", async (blockNumber) => {
      console.log("The latest block number is", blockNumber);
      const getNewblock = await web3Manager.alchemy.core.getBlock(blockNumber);
      console.log(getNewblock.number);
      // const getLogs = await web3Manager.alchemy.core.getLogs({
      //   address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      //   topics: [
      //     "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
      //   ],
      //   blockHash:
      //     "0x49664d1de6b3915d7e6fa297ff4b3d1c5328b8ecf2ff0eefb912a4dc5f6ad4a0",
      // });
      await Block.insertBlock(getNewblock);
    });

    CAs.map((CA) => {
      web3Manager.alchemy.ws.on(
        {
          // method: AlchemySubscription.PENDING_TRANSACTIONSMINED_TRANSACTIONS,
          method: AlchemySubscription.PENDING_TRANSACTIONS,
          toAddress: CA,
        },
        (tx) => console.log(tx)
      );
    });

    CAs.map((CA) => {
      web3Manager.alchemy.ws.on(
        {
          // method: AlchemySubscription.PENDING_TRANSACTIONSMINED_TRANSACTIONS,
          method: AlchemySubscription.MINED_TRANSACTIONS,
          toAddress: CA,
        },
        (tx) => {
          // console.log(tx);
        }
      );
    });

    // web3Manager.unlockFirstAccounts();

    // web3Manager.alchemy.core
    //   .getLogs({
    //     address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    //     topics: [
    //       "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
    //     ],
    //     blockHash:
    //       "0x49664d1de6b3915d7e6fa297ff4b3d1c5328b8ecf2ff0eefb912a4dc5f6ad4a0",
    //   })
    //   .then(console.log);

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

// app.use("/api", api);

app.use("/block", blockRouter);

app.use("/transaction", transactionRouter);

app.use("/logs", logsRouter);

app.use("/nft", nftRouter);
