/*async function send(
  web3,
  privateKey,
  gasPrice,
  contract,
  receiverAddress,
  numOfCoins
) {
  const account = web3.eth.accounts.privateKeyToAccount(privateKey).address;
  const transaction = contract.methods.sendCoin(receiverAddress, numOfCoins);
  const options = {
    to: transaction._parent._address,
    data: transaction.encodeABI(),
    gas: await transaction.estimateGas({ from: account }),
    gasPrice: gasPrice,
  };
  const signed = await web3.eth.accounts.signTransaction(options, privateKey);
  const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);
  return receipt;
}

async function send(web3, privateKey, gasPrice, transaction) {}

async function main() {
  const transaction = contract.methods.sendCoin(receiverAddress, numOfCoins);
  const receipt = await send(web3, privateKey, gasPrice, transaction);
}
*/

const test = [
  {
    number: 1,
  },
  {
    number: 2,
  },
  {
    number: 3,
  },
  {
    number: 4,
  },
  {
    number: 5,
  },
];

const findIdx = test.findIndex(({ number }) => number === 15);
// console.log(findIdx);