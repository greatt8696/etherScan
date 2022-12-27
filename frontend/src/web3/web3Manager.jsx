import Web3 from 'web3/dist/web3.min.js'

let instance

class ClientWeb3Manager {
  constructor() {
    this.latestBlockNumber = []
    this.blockSubscribe = false
    this.contractSubscribe = false

    if (instance) {
      throw new Error('이미 초기화된 WEB3입니다.')
    }

    instance = this
    console.log('@@@@@@@@@@@@@@@@@@@@@@init WEB3@@@@@@@@@@@@@@@@@@@@@@')
  }

  init = async (provider) => {
    this.provider = provider
    this.web3 = new Web3(provider || 'ws://127.0.0.1:8545')
    this.accounts = await this.web3.eth.getAccounts()
    this.accounts = [this.accounts.address]
  }
  // console.log(
  // "this.instance.methods",
  // this.instance.methods.faucetMint(2).send({ from: this.accounts[0] }).sign
  //);

  getProvider = () => this.provider

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
    if (this.contractSubscribe) return this
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
        .on('data', async (result) => callback(result))
        /**
          console.log(lastEvent)
          const jsonResult = JSON.stringify(result)
          if (lastEvent.findIndex(jsonResult) === -1) {
            if (lastEvent.length <= 8) {
              lastEvent.reverse()
              lastEvent.pop()
              lastEvent.reverse()
            }
            console.log(lastEvent)
            lastEvent.push(JSON.stringify(result))
            callback(result)
          } */
        .on('connected', function (subscriptionId) {
          console.log('subscribeTransactionID : ', subscriptionId)
        })
        .on('error', console.error),
    )
    this.contractSubscribe = true
    return this
  }
  subscribeNewBlockEvent = (callback) => {
    if (this.blockSubscribe) return this
    this.web3.eth
      .subscribe('newBlockHeaders')
      .on('data', async (result) => callback(result))
      .on('error', console.error)
    this.blockSubscribe = true
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
    return transactionInstance.methods[functionName](...args)
      .send({
        ...other,
      })
      .on('error', function (error) {
        console.error('민팅에 실패했어요 다시 시도해주세요.')
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

// const web3Instance = (() => {
//   var instance
//   function initiate() {
//     instance = new ClientWeb3Manager()
//   }
//   return {
//     getWeb3: function () {
//       if (!instance) {
//         instance = initiate()
//       }
//       return instance
//     },
//   }
// })()

// var instance = web3Instance.getWeb3()

let lockedInstance = new ClientWeb3Manager()
// let lockedInstance = Object.freeze(new ClientWeb3Manager())

export { lockedInstance, ClientWeb3Manager }
