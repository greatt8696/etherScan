const Web3 = require("web3");

const CA = "0x0C851690471aCfc7466264C93865169B781624aF";
const Contract = require("../../solidity/artifacts/Test.json");
// const { Transaction, Block } = require("../models");
// setInterval(async () => {
//   web3.eth.getAccounts(console.log);
//   const blockNum = await web3.eth.getBlockNumber();
//   console.log(blockNum);
//   web3.eth.getTransaction(CA).then(console.log);
// }, 1000);

// async function blocksFromWeb3(web3) {
//   const blockNum = await web3.eth.getBlockNumber(); // 최대갯수 : 600
//   const blocks = [];
//   return new Promise((resolve, reject) => {
//     Array(blockNum)
//       .fill(false)
//       .forEach(async (_, idx) => {
//         const getBlock = await web3.eth.getBlock(idx, true);
//         blocks.push(getBlock);
//         if (idx === blockNum - 1) resolve(blocks);
//       });
//   });
// }

class TransactionManager {
  constructor() {
    this.web3 = new Web3(Web3.givenProvider || "ws://127.0.0.1:8545");
  }

  init = async function () {
    this.instance = await new this.web3.eth.Contract(Contract.abi, CA);
    this.subscribeAllEvent();
    this.subscribeTransationEvent(this.instance);
    console.log(await this.getAccounts());
  };

  subscribeTransationEvent = function (contractInstance) {
    contractInstance.events
      .allEvents(function (error, result) {
        if (!error) {
          console.log("subscribeTransationEvent : ", result);
          return;
        }
        console.error(error);
      })
      .on("connected", function (subscriptionId) {
        console.log(subscriptionId);
      })
      .on("error", console.error);
  };

  subscribeAllEvent = function () {
    this.web3.eth
      .subscribe("newBlockHeaders", function (error, result) {
        if (!error) {
          console.log("newBlockHeaders : ", result.hash, result.number);
          return;
        }
        console.error(error);
      })
      .on("connected", function (subscriptionId) {
        console.log(subscriptionId);
      })
      .on("data", async function (blockHeader) {
        // console.log("@@newBlockHeaders=>transaction@@ : ", blockHeader);
      })
      .on("error", console.error);

    // const latestBlocks = this.instance.events.allEvents(
    //   { fromBlock: "latest" },
    //   async (err, result) => {
    //     console.log("@@@BEGIN@@ : ", result);
    //     const newTransaction = await this.web3.eth.getTransaction(result.hash);

    //     // await Transaction.insertTransaction(newTransaction);
    //     // console.log("@@@BEGIN@@ : ", JSON.stringify(result));
    //   }
    // );
  };

  getAccounts = async () => await this.web3.eth.getAccounts();
}

const autoContractTanscation = async (loopSize = 1000, duration = 10000) => {
  const instance = await this.web3.eth.Contract(Contract.abi, CA);
  let i = 0;
  const intervalId = setInterval(async () => {
    if (i >= loopSize) clearInterval(intervalId);
    console.log("autoContractTanscation running : ", i);

    const method = await instance.methods.foo("11111", "11111").send({
      from: FROM,
    });
    i += 1;
  }, duration);
};

const transactionManager = new TransactionManager();

transactionManager.init();
