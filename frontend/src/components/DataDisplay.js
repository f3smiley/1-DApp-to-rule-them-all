import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const DataDisplay = () => {
  const [exchangeRate, setExchangeRate] = useState(null);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      const web3 = new Web3(window.ethereum);
      const chainlinkOracleAddress = '0xYourChainlinkOracleAddress';
      const chainlinkOracleABI = []; // Add your Chainlink Oracle ABI here
      const chainlinkOracleContract = new web3.eth.Contract(chainlinkOracleABI, chainlinkOracleAddress);

      const rate = await chainlinkOracleContract.methods.latestAnswer().call();
      setExchangeRate(web3.utils.fromWei(rate, 'ether'));
    };

    fetchExchangeRate();
  }, []);

  return (
    <div>
      <h2>Exchange Rate</h2>
      {exchangeRate ? (
        <p>The current exchange rate from Chainlink Oracle is: {exchangeRate} WETH per LockableToken</p>
      ) : (
        <p>Loading exchange rate...</p>
      )}
    </div>
  );
};

export default DataDisplay;