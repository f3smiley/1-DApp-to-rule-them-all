```javascript
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import LockableToken from '../../contracts/LockableToken.json';
import MintableToken from '../../contracts/MintableToken.json';
import LockAndMint from '../../contracts/LockAndMint.json';

const TransactionHandler = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [lockableToken, setLockableToken] = useState(null);
  const [mintableToken, setMintableToken] = useState(null);
  const [lockAndMint, setLockAndMint] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        try {
          await window.ethereum.enable();
        } catch (error) {
          console.error("User denied account access");
        }
      } else if (window.web3) {
        setWeb3(new Web3(window.web3.currentProvider));
      } else {
        window.alert('Non-Ethereum browser detected. Consider trying MetaMask!');
      }
    };

    initWeb3();
  }, []);

  useEffect(() => {
    const initContracts = async () => {
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = LockableToken.networks[networkId];
      const lockableTokenInstance = new web3.eth.Contract(
        LockableToken.abi,
        deployedNetwork && deployedNetwork.address,
      );

      const mintableTokenInstance = new web3.eth.Contract(
        MintableToken.abi,
        deployedNetwork && deployedNetwork.address,
      );

      const lockAndMintInstance = new web3.eth.Contract(
        LockAndMint.abi,
        deployedNetwork && deployedNetwork.address,
      );

      setLockableToken(lockableTokenInstance);
      setMintableToken(mintableTokenInstance);
      setLockAndMint(lockAndMintInstance);
    };

    if (web3) {
      initContracts();
    }
  }, [web3]);

  useEffect(() => {
    const initAccounts = async () => {
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
    };

    if (web3) {
      initAccounts();
    }
  }, [web3]);

  const lockTokens = async (amount) => {
    await lockableToken.methods.lock(amount).send({ from: accounts[0] });
  };

  const mintTokens = async () => {
    await lockAndMint.methods.mint().send({ from: accounts[0] });
  };

  return (
    <div>
      <button id="lockButton" onClick={() => lockTokens(100)}>Lock Tokens</button>
      <button id="mintButton" onClick={mintTokens}>Mint Tokens</button>
    </div>
  );
};

export default TransactionHandler;
```