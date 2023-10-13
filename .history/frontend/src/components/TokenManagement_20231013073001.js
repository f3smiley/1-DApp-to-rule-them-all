import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import MintableToken from '../artifacts/MintableToken.json';
// import MintableToken from '../artifacts/MintableToken.json';

const TokenManagement = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [lockableTokenContract, setLockableTokenContract] = useState(null);
  const [mintableTokenContract, setMintableTokenContract] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        try {
          // Request account access
          await window.ethereum.enable();
        } catch (error) {
          console.error("User denied account access on DeFi Oracle Mainnet");
        }
      }
      else if (window.web3) {
        setWeb3(new Web3(window.web3.currentProvider));
      }
      else {
        console.log('Non-DeFi Oracle Mainnet browser detected. Consider trying MetaMask!');
      }
    };

    initWeb3();
  }, []);

  useEffect(() => {
    const initContracts = async () => {
      const networkId = 138; // DeFi Oracle Mainnet
      const deployedNetwork = LockableToken.networks[networkId];
      const lockableTokenInstance = new web3.eth.Contract(
        LockableToken.abi,
        deployedNetwork?.address,
const LockableToken = artifacts.require("LockableToken");

// ...

  // Corrected version
const mintableTokenInstance = new web3.eth.Contract(
  MintableToken.abi,
  deployedNetwork.address,  // Used deployedNetwork.address instead of mintableTokenAddress
);

      setLockableTokenContract(lockableTokenInstance);
      setMintableTokenContract(mintableTokenInstance);
    };

    if (web3) {
      initContracts();
    }
  }, [web3]);

  useEffect(() => {
    const getAccounts = async () => {
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
    };

    if (web3) {
      getAccounts();
    }
  }, [web3]);

  const lockTokens = async (amount) => {
    await lockableTokenContract.methods.lock(amount).send({ from: accounts[0] });
  };

  const mintTokens = async (amount) => {
    await mintableTokenContract.methods.mint(amount).send({ from: accounts[0] });
  };

  return (
    <div>
      <button onClick={() => lockTokens(100)}>Lock Tokens</button>
      <button onClick={() => mintTokens(100)}>Mint Tokens</button>
    </div>
  );
};


export default TokenManagement;
