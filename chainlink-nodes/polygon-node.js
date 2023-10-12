const { ChainlinkClient } = require('chainlink-client');
const { config } = require('../config/chainlink-node-config.json');

const client = new ChainlinkClient(config.POLYGON_NODE_URL);

async function getExchangeRate() {
  try {
    const response = await client.getLatestRoundData(config.ORACLE_CONTRACT_ADDRESS, config.JOB_ID);
    return response.answer / (10 ** response.decimals);
  } catch (error) {
    console.error(`Error getting exchange rate: ${error}`);
  }
}

module.exports = { getExchangeRate };