```python
from web3 import Web3
from besu import BesuProvider

# Hyperledger BISU Node Addresses
BISU_NODE_ADDRESS_1 = "http://localhost:8545"
BISU_NODE_ADDRESS_2 = "http://localhost:8546"

# Connect to Hyperledger BISU nodes
web3_bisu_1 = Web3(Web3.HTTPProvider(BISU_NODE_ADDRESS_1))
web3_bisu_2 = Web3(Web3.HTTPProvider(BISU_NODE_ADDRESS_2))

# Check connection
def check_connection():
    if web3_bisu_1.isConnected() and web3_bisu_2.isConnected():
        print("Connected to Hyperledger BISU nodes")
    else:
        print("Connection to Hyperledger BISU nodes failed")

# Get block number
def get_block_number():
    block_number_bisu_1 = web3_bisu_1.eth.blockNumber
    block_number_bisu_2 = web3_bisu_2.eth.blockNumber
    print(f"Current block number for BISU node 1: {block_number_bisu_1}")
    print(f"Current block number for BISU node 2: {block_number_bisu_2}")

# Get balance
def get_balance(address):
    balance_bisu_1 = web3_bisu_1.eth.getBalance(address)
    balance_bisu_2 = web3_bisu_2.eth.getBalance(address)
    print(f"Current balance for address {address} on BISU node 1: {balance_bisu_1}")
    print(f"Current balance for address {address} on BISU node 2: {balance_bisu_2}")

# Run functions
check_connection()
get_block_number()
get_balance("0xYourEthereumAddress")
```