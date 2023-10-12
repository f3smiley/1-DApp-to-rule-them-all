```python
from web3 import Web3
from eth_account.messages import encode_defunct

class UserAuthentication:
    def __init__(self, provider_url):
        self.web3 = Web3(Web3.HTTPProvider(provider_url))

    def connect_wallet(self, public_address, signature, original_message):
        message = encode_defunct(text=original_message)
        signer = self.web3.eth.account.recover_message(message, signature=signature)
        return signer.lower() == public_address.lower()

    def get_balance(self, public_address, contract_address):
        contract = self.web3.eth.contract(address=contract_address, abi=ERC20_ABI)
        return contract.functions.balanceOf(public_address).call()

# Replace with the actual ABI of your ERC20 token
ERC20_ABI = []

# Replace with the actual provider URL
provider_url = "http://localhost:8545"

auth = UserAuthentication(provider_url)

# Replace with the actual public address, signature, and original message
public_address = "0x..."
signature = "0x..."
original_message = "Hello, world!"

if auth.connect_wallet(public_address, signature, original_message):
    print("Wallet connected successfully!")
else:
    print("Failed to connect wallet.")

# Replace with the actual contract address
contract_address = "0x..."

balance = auth.get_balance(public_address, contract_address)
print(f"Balance: {balance}")
```