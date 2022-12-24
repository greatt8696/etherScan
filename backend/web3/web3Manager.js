const Web3 = require("web3");

const {
  connectDb,
  initDb,
  Block,
  Transaction,
  Logs,
  Nft,
} = require("../mongoDb/models/index");

class Web3Manager {
  constructor({ networkName }) {
    this.networkName = networkName;
    this.web3 = new Web3(
      Web3.givenProvider || networkName === "goerli"
        ? "wss://eth-goerli.g.alchemy.com/v2/_NSjX6xORhXSJKw214enYTvnDCiRVGa0"
        : "ws://127.0.0.1:8545"
    );
    this.latestBlockNumber = [];
  }

  init = async () => {
    this.accounts = await this.web3.eth.getAccounts();
    if (this.networkName === "goerli") {
      this.accounts = await this.web3.eth.accounts.privateKeyToAccount(
        "0xdb05cda62e2732c3c055642c45696eb9ef0265c2c8fe811ddae2d91b313e2795"
      );
      this.accounts = [this.accounts.address];
    }
    //console.log(
    // "this.instance.methods",
    // this.instance.methods.faucetMint(2).send({ from: this.accounts[0] }).sign
    //);
    return this;
  };

  setContract = async (CA, Contract) => {
    this.instance = await new this.web3.eth.Contract(Contract.abi, CA);
    this.methods = this.instance.methods;
    return this;
  };

  insertBlockNumber = (number) => {
    if (this.isExistBlockNumber(number)) return;
    this.latestBlockNumber.push(number);
  };

  isExistBlockNumber = (number) =>
    this.latestBlockNumber.findIndex((blockNumber) => blockNumber === number) >
    -1
      ? true
      : false;

  getAccounts = () => this.accounts;

  getContractInstance = () => this.instance;

  getMethodsName = () =>
    Object.keys(this.methods).filter((_, idx) => idx % 3 === 0);

  getWeb3Eth = () => this.web3.eth;

  subscribeTransationEvent = (contractInstance) => {
    contractInstance.events
      .allEvents(async function (error, result) {
        if (!error) {
          console.log(
            "subscribeTransationEvent : ",
            result.event,
            result.returnValues
          );
        }
        console.error(error);
      })
      .on("data", async function (result) {
        await Logs.insertlogss(result);
      })
      .on("connected", function (subscriptionId) {
        console.log("subscribeTransactionID : ", subscriptionId);
      })
      .on("error", console.error);
    return this;
  };

  subscribeNewBlockEvent = (callback) => {
    this.web3.eth
      .subscribe("newBlockHeaders")
      .on("data", async (result) => {
        console.log("newBlockHeadersID-BlockNumber : ", result.number);
        if (this.isExistBlockNumber(result.number)) return;
        this.insertBlockNumber(result.number);
        callback(result);
      })
      .on("error", console.error);
    return this;
  };

  initTransaction = () => {
    this.sendTransaction({
      functionName: "faucetMint",
      args: [getRandomNumber(500000, 5000000)],

      from: this.getAccounts()[0],
    });
    return this;
  };

  sendTransaction = (
    inputObj = {
      functionName: "Transfer",
      args: [],
      from: "0x...",
      to: "0x...",
      value: "0x...",
    },
    transactionInstance = this.instance
  ) => {
    const { args, functionName, ...other } = inputObj;
    return transactionInstance.methods[functionName](...args).send({
      ...other,
    });
  };

  startTransactionBot = async (
    selectTable = ["faucetMint", "transfer", "burn"],
    loopSize = 3000,
    duration = 80000
  ) => {
    let i = 0;
    const intervalId = setInterval(async () => {
      if (i >= loopSize) clearInterval(intervalId);

      const selectedFunction = pickRandom(["faucetMint", "transfer", "burn"]);
      let inputObj;

      switch (selectedFunction) {
        case "faucetMint":
          inputObj = {
            functionName: "faucetMint",
            args: [getRandomNumber(20, 5000)],
            from: pickRandom(this.getAccounts()),
          };
          break;
        case "transfer":
          inputObj = {
            functionName: "transfer",
            args: [pickRandom(this.getAccounts()), getRandomNumber(20, 25)],
            from: this.getAccounts()[0],
          };
          break;
        case "burn":
          inputObj = {
            functionName: "burn",
            args: [getRandomNumber(20, 25)],
            from: this.getAccounts()[0],
          };
          break;

        default:
          break;
      }
      this.sendTransaction(inputObj);
      console.log(`AUTO-${i} : {${JSON.stringify(inputObj)}}`);
      i += 1;
    }, duration);
  };
}

const pickRandom = (arr) => {
  const random = Math.random();
  const randomIdx = parseInt(random * arr.length);
  return arr[randomIdx];
};

const getRandomNumber = (min, max) => {
  const random = Math.random();
  const randomGap = (max - min) * random;
  const setMinimum = randomGap + min;
  const parsedInteger = parseInt(setMinimum);
  return parsedInteger;
};

module.exports = { Web3Manager };
