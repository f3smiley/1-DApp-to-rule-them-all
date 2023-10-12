```javascript
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import Authentication from './components/Authentication';
import TokenManagement from './components/TokenManagement';
import TransactionHandler from './components/TransactionHandler';
import DataDisplay from './components/DataDisplay';
import './styles.css';

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        try {
          await window.ethereum.enable();
          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);
        } catch (error) {
          console.error("Error enabling ethereum: ", error);
        }
      } else {
        console.error("Please install MetaMask!");
      }
    };
    initWeb3();
  }, []);

  return (
    <div className="App">
      <Authentication web3={web3} account={account} />
      <TokenManagement web3={web3} account={account} />
      <TransactionHandler web3={web3} account={account} />
      <DataDisplay web3={web3} account={account} />
    </div>
  );
};

export default App;
```