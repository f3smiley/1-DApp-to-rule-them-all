# Lock and Mint Synthetic Token DApp

This DApp allows users to lock ERC20 tokens on Ethereum and mint synthetic tokens on Polygon. It uses Chainlink oracles for exchange rates and Hyperledger Besu nodes for additional security.

## Dependencies

1. Node.js
2. Docker
3. Solidity Compiler (solc)
4. Truffle
5. Web3.js or Ethers.js
6. GoLang
7. SQL or NoSQL Database

## Setup

1. Install all the dependencies listed above.
2. Clone the repository and navigate to the project directory.

## Frontend Setup

1. Navigate to the `frontend` directory.
2. Run `npm install` to install the necessary node modules.
3. Open `frontend/src/App.js` and ensure the contract addresses and Chainlink oracle addresses are correct.
4. Run `npm start` to start the frontend.

## Smart Contract Deployment

1. Navigate to the `contracts` directory.
2. Compile the contracts using `solc`.
3. Deploy `LockableToken.sol`, `MintableToken.sol`, and `LockAndMint.sol` to the Ethereum and Polygon networks respectively.

## Chainlink Node Setup

1. Navigate to the `chainlink-nodes` directory.
2. Run `node ethereum-node.js` and `node polygon-node.js` to start the Chainlink nodes.
3. Ensure the nodes are properly connected to the Ethereum and Polygon networks.

## Cross-Chain Communication

1. Navigate to the `cross-chain-communication` directory.
2. Run `node Chainbridge.js` to start the Chainbridge service.

## Hyperledger Besu Node Setup

1. Navigate to the `hyperledger-bisu-nodes` directory.
2. Run `go run setup.go` to set up the Besu nodes.
3. Run `go run interaction.go` to interact with the Besu nodes.

## Testing

1. Navigate to the `tests` directory.
2. Run `truffle test` to execute the tests.

## Docker Setup

1. Navigate to the `docker` directory.
2. Build the Docker images using `docker build -t chainlink-node ./chainlink-node` and `docker build -t hyperledger-bisu-node ./hyperledger-bisu-node`.
3. Run `docker-compose up` to start the services.

## Usage

1. Open the DApp in your browser.
2. Authenticate using the `Authentication.js` component.
3. Lock your ERC20 tokens using the `TokenManagement.js` component.
4. The DApp will interact with the `LockAndMint.sol` contract and lock your tokens.
5. The equivalent amount of synthetic tokens will be minted on Polygon.
6. You can view the exchange rate data from the Chainlink oracles in the `DataDisplay.js` component.

Remember to always test thoroughly before deploying to live networks.