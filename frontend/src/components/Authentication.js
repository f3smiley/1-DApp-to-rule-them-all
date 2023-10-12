```javascript
import React, { useState } from 'react';
import Web3 from 'web3';

const Authentication = () => {
  const [account, setAccount] = useState(null);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  };

  const loadBlockchainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
  };

  const handleLogin = async () => {
    await loadWeb3();
    await loadBlockchainData();
  };

  return (
    <div>
      <button id="loginButton" onClick={handleLogin}>
        Connect Wallet
      </button>
      {account && <p>Connected with account: {account}</p>}
    </div>
  );
};

export default Authentication;
```