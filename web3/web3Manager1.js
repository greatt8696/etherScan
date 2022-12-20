const Web3 = require("web3");

const FROM = "0x879F90de3f5E39567be8C090a33219d30d5EC33e"; // 첫번째 계정
const CA = "0x9Bae0edfA21976f5b5476B4d295a0fE1C14D3E36";
const Contract = require("../contracts/Test.json");
const { Transaction, Block } = require("../models");
// setInterval(async () => {
//   web3.eth.getAccounts(console.log);
//   const blockNum = await web3.eth.getBlockNumber();
//   console.log(blockNum);
//   web3.eth.getTransaction(CA).then(console.log);
// }, 1000);

const web3 = new Web3(Web3.givenProvider || "ws://127.0.0.1:8545");

async function blocksFromWeb3(web3) {
  const blockNum = await web3.eth.getBlockNumber(); // 최대갯수 : 600
  const blocks = [];
  return new Promise((resolve, reject) => {
    Array(blockNum)
      .fill(false)
      .forEach(async (_, idx) => {
        const getBlock = await web3.eth.getBlock(idx, true);
        blocks.push(getBlock);
        if (idx === blockNum - 1) resolve(blocks);
      });
  });
}

class TransactionManager {
  constructor(web3) {
    this.web3 = web3;
  }

  init = async function () {
    this.instance = await new this.web3.eth.Contract(Contract.abi, CA);
    this.subscribeAllEvent();
  };

  subscribeAllEvent = function () {
    const newBlockHeaders = new web3.eth.subscribe("newBlockHeaders", function (
      error,
      result
    ) {
      if (!error) {
        console.log("newBlockHeaders : ", result);
        return;
      }
      console.error(error);
    })
      .on("connected", function (subscriptionId) {
        console.log(subscriptionId);
      })
      .on("data", async function (blockHeader) {
        blockHeader["transactions"] = [];
        console.log("@@newBlockHeaders=>transaction@@ : ", blockHeader);
        const getLatestBlock = await web3.eth.getBlock("latest", true);
        await Block.insertBlock(getLatestBlock);
        getLatestBlock.transactions.forEach(async (transaction) => {
          console.log("Transaction:newTransaction", transaction);
          await Transaction.insertTransaction(transaction);
        });
      })
      .on("error", console.error);

    const latestBlocks = this.instance.events.allEvents(
      { fromBlock: "latest" },
      async (err, result) => {
        console.log("@@@BEGIN@@ : ", result);
        const newTransaction = await new web3.eth.getTransaction(result.hash);

        await Transaction.insertTransaction(newTransaction);
        // console.log("@@@BEGIN@@ : ", JSON.stringify(result));
      }
    );
  };
}

const getAllBlocks = async () => blocksFromWeb3(web3);

const getTransactionManager = async () => new TransactionManager(web3);

const autoContractTanscation = async (loopSize = 1000, duration = 10000) => {
  const instance = await new web3.eth.Contract(Contract.abi, CA);
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

module.exports = {
  web3,
  getAllBlocks,
  getTransactionManager,
  autoContractTanscation,
};
