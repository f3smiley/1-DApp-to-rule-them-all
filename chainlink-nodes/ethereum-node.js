const { ChainlinkClient } = require('chainlink-client');
const { ethers } = require('ethers');
const config = require('../config/defi-oracle-node-config.json');

// Initialize Chainlink Client
const chainlinkClient = new ChainlinkClient(config.defiOracleNodeUrl, config.defiOracleNodeSecret);

// Initialize DeFi Oracle Mainnet provider
const provider = new ethers.providers.JsonRpcProvider(config.defiOracleMainnetUrl);

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

// Function to listen for LockEvent from LockableToken contract on DeFi Oracle Mainnet
async function listenForLockEvent() {
  const lockableTokenAddress = config.lockableTokenAddressOnDefiOracle;
  const lockableTokenABI = require('../contracts/LockableTokenOnDefiOracle.sol').abi;

  const lockableTokenContract = new ethers.Contract(lockableTokenAddress, lockableTokenABI, provider);
  lockableTokenContract.on('LockEvent', async (userAddress, amount) => {
    console.log(`LockEvent received. User: ${userAddress}, Amount: ${amount}`);
    const exchangeRate = await getExchangeRate();
    console.log(`Exchange rate from Chainlink Oracle: ${exchangeRate}`);
  });
}

listenForLockEvent();
