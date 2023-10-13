const { ChainlinkClient } = require('chainlink-client');
const { ethers } = require('ethers');
const config = require('../config/chainlink-node-config.json');

// Initialize Chainlink Client
const chainlinkClient = new ChainlinkClient(config.chainlinkNodeUrl, config.chainlinkNodeSecret);

// Initialize Ethereum provider
const provider = new ethers.providers.JsonRpcProvider(config.ethereumNodeUrl);

// Function to get exchange rate from Chainlink Oracle
async function getExchangeRate() {
  try {
    const jobId = config.jobId;
    const oracleAddress = config.oracleAddress;
    const result = await chainlinkClient.getJobRun(jobId, oracleAddress);
    return result.data.result;
  } catch (error) {
    console.error('Error getting exchange rate from Chainlink Oracle:', error);
  }
}

// Function to listen for LockEvent from LockableToken contract
async function listenForLockEvent() {
  const lockableTokenAddress = config.lockableTokenAddress;
  const lockableTokenABI = require('../contracts/LockableToken.sol').abi;

  const lockableTokenContract = new ethers.Contract(lockableTokenAddress, lockableTokenABI, provider);
  lockableTokenContract.on('LockEvent', async (userAddress, amount) => {
    console.log(`LockEvent received. User: ${userAddress}, Amount: ${amount}`);
    const exchangeRate = await getExchangeRate();
    console.log(`Exchange rate from Chainlink Oracle: ${exchangeRate}`);
  });
}

listenForLockEvent();