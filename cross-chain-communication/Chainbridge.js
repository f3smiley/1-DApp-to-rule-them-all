const Web3 = require('web3');
const ChainBridge = require('@chainbridge/sdk');

// Initialize Web3 instances for Ethereum and Polygon
const web3Eth = new Web3('http://localhost:138'); // DeFi Oracle Mainnet RPC URL
const web3Poly = new Web3('http://localhost:8546'); // Polygon RPC URL

// Initialize ChainBridge
const chainBridge = new ChainBridge.ChainBridge({
    chains: [
        {
            name: 'defi-oracle',
            rpcUrl: 'http://localhost:138',
            type: 'defi-oracle',
            bridgeAddress: '0x...', // Ethereum bridge contract address
            erc20HandlerAddress: '0x...', // Ethereum ERC20 handler contract address
            erc721HandlerAddress: '0x...', // Ethereum ERC721 handler contract address
            genericHandlerAddress: '0x...', // Ethereum generic handler contract address
            gasLimit: '0x2710',
            maxGasPrice: '0x2540be400'
        },
        {
            name: 'polygon',
            rpcUrl: 'http://localhost:8546',
            type: 'substrate',
            bridgeAddress: '0x...', // Polygon bridge contract address
            erc20HandlerAddress: '0x...', // Polygon ERC20 handler contract address
            erc721HandlerAddress: '0x...', // Polygon ERC721 handler contract address
            genericHandlerAddress: '0x...', // Polygon generic handler contract address
            gasLimit: '0x2710',
            maxGasPrice: '0x2540be400'
        }
    ]
});

// Function to lock tokens on Ethereum and mint on Polygon
async function lockAndMint(lockableTokenAddress, mintableTokenAddress, amount, sender, receiver) {
    // Get the LockableToken contract instance
    const LockableToken = new web3Eth.eth.Contract(require('../contracts/LockableToken.sol'), lockableTokenAddress);

    // Lock tokens on DeFi Oracle Mainnet (Chain 138)
    await LockableToken.methods.lockTokens(amount).send({ from: sender });

    // Get the MintableToken contract instance on Polygon
    const MintableToken = new web3Poly.eth.Contract(require('../contracts/MintableToken.sol'), mintableTokenAddress);

    // Mint tokens on Polygon
    await MintableToken.methods.mintTokens(receiver, amount).send({ from: sender });
}

module.exports = { lockAndMint };
