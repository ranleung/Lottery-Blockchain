const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const keys = require('./keys');
const { interface, bytecode } = require('./complie');

const provider = new HDWalletProvider(
  keys.Mnemonic,
  'https://rinkeby.infura.io/RR8zqqQBVeDRHhcxuCnn'
);

const web3 = new Web3(provider);
const INITIAL_STRING='Hi there!';

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0])

  const result = await new web3.eth.Contract(JSON.parse(interface))
  .deploy({ data: bytecode })
  .send({ from: accounts[0], gas: 1000000})

  console.log('Contract deployed to', result.options.address);
};

deploy();
