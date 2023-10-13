import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

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
          console.error("User denied account access");
        }
      }
      else if (window.web3) {
        setWeb3(new Web3(window.web3.currentProvider));
      }
      else {
        console.log('Non-Ethereum browser detected. Consider trying MetaMask!');
      }
    };

    initWeb3();
  }, []);

  useEffect(() => {
    34:     const initContracts = async () => Promise<void>{
    35:       const networkId = await web3.eth.net.getId();
    36:       const deployedNetwork = LockableToken.networks[networkId];
    37:       const lockableTokenInstance = new web3.eth.Contract(
    38:         LockableToken.abi,
    39:         deployedNetwork?.address,
    40:       );
    41: 
    42:       const mintableTokenInstance = new web3.eth.Contract(
    43:         MintableToken.abi,
    44:         deployedNetwork?.address,
    45:       );
    46: 
    47:       setLockableTokenContract(lockableTokenInstance);
    48:       setMintableTokenContract(mintableTokenInstance);
    49:     };
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