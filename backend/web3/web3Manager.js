const Web3 = require("web3");

const CA = "0x077108C0a03844203434F08DEBd1739CEc85C2AB";
const Contract = require("../../solidity/artifacts/TestTransition.json");

const {
  connectDb,
  initDb,
  Block,
  Transaction,
  Logs,
  Nft,
} = require("../models/index");

class TransactionManager {
  constructor() {
    this.web3 = new Web3(Web3.givenProvider || "ws://127.0.0.1:8545");
  }

  init = async () => {
    this.accounts = await this.web3.eth.getAccounts();
    this.instance = await new this.web3.eth.Contract(Contract.abi, CA);
    this.methods = this.instance.methods;
    this.subscribeAllEvent();
    this.subscribeTransationEvent(this.instance);
  };

  getAccounts = () => this.accounts;

  getMethodsName = () =>
    Object.keys(this.methods).filter((_, idx) => idx % 3 === 0);

  subscribeTransationEvent = (contractInstance) => {
    contractInstance.events
      .allEvents(async function (error, result) {
        if (!error) {
          console.log(
            "subscribeTransationEvent : ",
            result.event,
            result.returnValues
          );
          await Logs.insertLogs(result);
          return;
        }
        console.error(error);
      })
      .on("connected", function (subscriptionId) {
        console.log("subscribeTransactionID : ", subscriptionId);
      })
      .on("error", console.error);
  };

  subscribeAllEvent = () => {
    this.web3.eth
      .subscribe("newBlockHeaders", async (error, result) => {
        if (!error) {
          console.log("newBlockHeaders : ", result.hash, result.number);
          const newTransaction = await this.web3.eth.getTransaction(
            result.hash
          );
          await Transaction.insertTransaction(newTransaction);
          return;
        }
        console.error(error);
      })
      .on("connected", function (subscriptionId) {
        console.log("subscribeNewBlockID : ", subscriptionId);
      })
      .on("data", async function (blockHeader) {
        // console.log("@@newBlockHeaders=>transaction@@ : ", blockHeader);
      })
      .on("error", console.error);
  };

  sendTransaction = (
    inputObj = {
      functionName: "Transfer",
      args: [],
      from: "0x",
      to: "0x",
      value: "0x",
    },
    transactionInstance = this.instance
  ) => {
    const { args, functionName, ...other } = inputObj;
    console.log(
      `AUTO : transactionInstance.methods[${JSON.stringify(
        functionName
      )}](${JSON.stringify({
        ...args,
      })}).send(${JSON.stringify({
        ...other,
      })})`
    );
    return transactionInstance.methods[functionName](...args).send({
      ...other,
    });
  };

  autoContractTanscation = async (
    selectTable = ["faucetMint", "transfer", "burn"],
    loopSize = 10,
    duration = 1000
  ) => {
    let i = 0;
    const intervalId = setInterval(async () => {
      if (i >= loopSize) clearInterval(intervalId);

      const selectedFunction = randomChoice(["faucetMint", "transfer", "burn"]);
      let inputObj;

      switch (selectedFunction) {
        case "faucetMint":
          inputObj = {
            functionName: "faucetMint",
            args: [randomNumber(20, 5000)],
            from: randomChoice(this.getAccounts()),
          };
          break;
        case "transfer":
          inputObj = {
            functionName: "transfer",
            args: [randomChoice(this.getAccounts()), randomNumber(20, 25)],
            from: this.getAccounts()[0],
          };
          break;
        case "burn":
          inputObj = {
            functionName: "burn",
            args: [randomNumber(20, 25)],
            from: this.getAccounts()[0],
          };
          break;

        default:
          break;
      }
      console.log("@@@@input : ", inputObj);
      this.sendTransaction(inputObj);
      console.log(`AUTO-${i} : {${JSON.stringify(inputObj)}}`);
      i += 1;
    }, duration);
  };
}

const randomChoice = (arr) => {
  const random = Math.random();
  const randomIdx = parseInt(random * arr.length);
  return arr[randomIdx];
};

const randomNumber = (min, max) => {
  const random = Math.random();
  const randomGap = (max - min) * random;
  const setMinimum = randomGap + min;
  const parsedInteger = parseInt(setMinimum);
  return parsedInteger;
};

(async () => {
  connectDb();

  const transactionManager = new TransactionManager();
  await transactionManager.init();
  console.log(transactionManager.getMethodsName());
  try {
    transactionManager.sendTransaction({
      functionName: "faucetMint",
      args: [randomNumber(500000, 5000000)],
      from: transactionManager.getAccounts()[0],
    });
    transactionManager.autoContractTanscation();
  } catch (_) {}
})();