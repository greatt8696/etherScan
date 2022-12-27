import Web3 from 'web3/dist/web3.min.js'

class ClientWeb3Manager {
  constructor() {
    this.latestBlockNumber = []
    this.web3 = false
  }

  init = async (provider) => {
    if (!this.web3) {
      console.log('@@@@@@@@@@@@@@@@@@@@@@init WEB3@@@@@@@@@@@@@@@@@@@@@@')
      this.web3 = new Web3(provider || 'ws://127.0.0.1:8545')
    }
    this.accounts = await this.web3.eth.getAccounts()
    this.accounts = [this.accounts.address]
  }
  // console.log(
  // "this.instance.methods",
  // this.instance.methods.faucetMint(2).send({ from: this.accounts[0] }).sign
  //);

  setContracts = async (CAs, contracts) => {
    this.instances = await Promise.all(
      CAs.map(
        async (CA, idx) => new this.web3.eth.Contract(contracts[idx].abi, CA),
      ),
    )
    this.methods = this.instances.map((instance) => instance.methods)
    return this
  }

  insertBlockNumber = (number) => {
    if (this.isExistBlockNumber(number)) return
    this.latestBlockNumber.push(number)
  }

  isExistBlockNumber = (number) =>
    this.latestBlockNumber.findIndex((blockNumber) => blockNumber === number) >
    -1
      ? true
      : false

  getAccounts = () => this.accounts

  getContractInstance = () => this.instances

  getMethodsName = () =>
    Object.keys(this.methods).filter((_, idx) => idx % 3 === 0)

  getWeb3Eth = () => this.web3.eth

  subscribeTransationEvent = (contractInstances, callback) => {
    contractInstances.forEach((contractInstance) =>
      contractInstance.events
        .allEvents(async function (error, result) {
          if (!error) {
            console.log(
              'subscribeTransationEvent : ',
              result.event,
              result.returnValues,
            )
          }
          console.error(error)
        })
        .on('data', async function (result) {
          callback(result)
        })
        .on('connected', function (subscriptionId) {
          console.log('subscribeTransactionID : ', subscriptionId)
        })
        .on('error', console.error),
    )
    return this
  }
  subscribeNewBlockEvent = (callback) => {
    this.web3.eth
      .subscribe('newBlockHeaders')
      .on('data', async (result) => {
        console.log('newBlockHeadersID-BlockNumber : ', result.number)
        if (this.isExistBlockNumber(result.number)) return
        this.insertBlockNumber(result.number)
        callback(result)
      })
      .on('error', console.error)
    return this
  }

  sendTransaction = (
    inputObj = {
      functionName: 'Transfer',
      args: [],
      from: '0x...',
      to: '0x...',
      value: '0x...',
    },
    transactionInstance = this.getContractInstance(),
  ) => {
    const { args, functionName, ...other } = inputObj
    return transactionInstance.methods[functionName](...args).send({
      ...other,
    })
  }
}

const pickRandom = (arr) => {
  const random = Math.random()
  const randomIdx = parseInt(random * arr.length)
  return arr[randomIdx]
}

const getRandomNumber = (min, max) => {
  const random = Math.random()
  const randomGap = (max - min) * random
  const setMinimum = randomGap + min
  const parsedInteger = parseInt(setMinimum)
  return parsedInteger
}

const web3Instance = (() => {
  var instance
  function initiate() {
    instance = new ClientWeb3Manager()
  }
  return {
    getWeb3: function () {
      if (!instance) {
        instance = initiate()
      }
      return instance
    },
  }
})()

var instance = web3Instance.getWeb3()

export { instance, ClientWeb3Manager }
