```python
import web3
from web3 import Web3
from eth_account.messages import encode_defunct

# Connect to Ethereum network
w3 = Web3(Web3.HTTPProvider('http://localhost:8545'))

# User's private key and account
private_key = 'YOUR_PRIVATE_KEY'
account = 'YOUR_ACCOUNT_ADDRESS'

# Smart contract addresses
lockable_token_address = 'LOCKABLE_TOKEN_CONTRACT_ADDRESS'
mintable_token_address = 'MINTABLE_TOKEN_CONTRACT_ADDRESS'
lock_and_mint_address = 'LOCK_AND_MINT_CONTRACT_ADDRESS'

# Connect to the smart contracts
lockable_token_contract = w3.eth.contract(address=lockable_token_address, abi=lockable_token_abi)
mintable_token_contract = w3.eth.contract(address=mintable_token_address, abi=mintable_token_abi)
lock_and_mint_contract = w3.eth.contract(address=lock_and_mint_address, abi=lock_and_mint_abi)

def send_transaction(contract, function, *args):
    nonce = w3.eth.getTransactionCount(account)

    txn_dict = function(*args).buildTransaction({
        'chainId': 3,
        'gas': 7000000,
        'nonce': nonce,
    })

    signed_txn = w3.eth.account.signTransaction(txn_dict, private_key=private_key)

    result = w3.eth.sendRawTransaction(signed_txn.rawTransaction)

    tx_receipt = w3.eth.waitForTransactionReceipt(result)

    return tx_receipt

def lock_tokens(amount):
    function = lockable_token_contract.functions.lock
    return send_transaction(lockable_token_contract, function, amount)

def mint_tokens(amount):
    function = mintable_token_contract.functions.mint
    return send_transaction(mintable_token_contract, function, amount)

def unlock_tokens(amount):
    function = lockable_token_contract.functions.unlock
    return send_transaction(lockable_token_contract, function, amount)
```