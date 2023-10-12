```python
import web3
from web3 import Web3
from eth_account.messages import encode_defunct

# Connect to Ethereum node
w3 = Web3(Web3.HTTPProvider('http://localhost:8545'))

# Set the default account (this account will receive the minted tokens)
w3.eth.defaultAccount = w3.eth.accounts[0]

# Addresses of the deployed smart contracts
lockable_token_address = '0x...'
mintable_token_address = '0x...'
oracle_contract_address = '0x...'

# ABI of the deployed smart contracts
lockable_token_abi = '[...]'
mintable_token_abi = '[...]'
oracle_contract_abi = '[...]'

# Create contract instances
lockable_token_contract = w3.eth.contract(address=lockable_token_address, abi=lockable_token_abi)
mintable_token_contract = w3.eth.contract(address=mintable_token_address, abi=mintable_token_abi)
oracle_contract = w3.eth.contract(address=oracle_contract_address, abi=oracle_contract_abi)

def get_balance():
    # Get the balance of the default account
    balance = lockable_token_contract.functions.balanceOf(w3.eth.defaultAccount).call()
    print(f'Balance: {balance}')

def get_exchange_rate():
    # Get the current exchange rate from the oracle contract
    exchange_rate = oracle_contract.functions.getExchangeRate().call()
    print(f'Exchange Rate: {exchange_rate}')

def display_data():
    get_balance()
    get_exchange_rate()

if __name__ == "__main__":
    display_data()
```