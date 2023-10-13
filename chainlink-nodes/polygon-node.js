const { ChainlinkClient } = require('chainlink-client');
const { config } = require('../config/defi-oracle-mainnet-config.json');

const client = new ChainlinkClient(config.DEFI_ORACLE_MAINNET_URL);

async function getExchangeRate() {
  try {
    const response = await client.getLatestRoundData(config.DEFI_ORACLE_MAINNET_CONTRACT_ADDRESS, config.JOB_ID);
    return response.answer / (10 ** response.decimals);
  } catch (error) {
    console.error(`Error getting exchange rate: ${error}`);
  }
}

module.exports = { getExchangeRate };
