const Web3Manager = require("../../../backend/web3/web3Manager");

const { CA, Contract } = require("../solidity");

class ClientWeb3Manager extends Web3Manager {
  constructor({ networkName }) {
    super({ networkName });
  }
}



/**
  (async () => {
    connectDb();
    const web3Manager = new Web3Manager({ networkName: "ganache" });
    try {
      await web3Manager.init();
      await web3Manager.setContract(CA, Contract);
      const instance = web3Manager.getContractInstance();
      const addLogsToDB = async (logs) => await Logs.insertlogss(result);
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
        .subscribeTransationEvent(instance, addLogsToDB)
        .initTransaction()
        .startTransactionBot();

      /*  
          체이닝을 쓴 경우
          web3Manager.subscribeNewBlockEvent(addBlockAndTransactionToDB)
                    .subscribeTransationEvent(instance, addLogsToDB)
                    .initTransaction()
                    .startTransactionBot();
          -----------------------------------------------
          체이닝을 쓰지 않은 경우
          web3Manager.subscribeNewBlockEvent(addBlockAndTransactionToDB);
          web3Manager.subscribeTransationEvent(instance, addLogsToDB);
          web3Manager.initTransaction();
          web3Manager.startTransactionBot();
          -----------------------------------------------
      
    } catch (error) {
      console.error(error);
    }
  })();

*/
