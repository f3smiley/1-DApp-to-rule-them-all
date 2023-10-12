```python
import unittest
from web3 import Web3
from solcx import compile_source

# Import the smart contract files
from smart_contracts import lockable_token, mintable_token, lock_and_mint

class TestContracts(unittest.TestCase):
    def setUp(self):
        # Connect to Ganache (local blockchain)
        self.w3 = Web3(Web3.HTTPProvider("http://127.0.0.1:8545"))
        self.w3.eth.defaultAccount = self.w3.eth.accounts[0]

        # Compile the smart contracts
        self.lockable_token_compiled = compile_source(lockable_token)
        self.mintable_token_compiled = compile_source(mintable_token)
        self.lock_and_mint_compiled = compile_source(lock_and_mint)

    def test_deploy_lockable_token(self):
        # Deploy the LockableToken contract
        LockableToken = self.w3.eth.contract(
            abi=self.lockable_token_compiled["<stdin>:LockableToken"]["abi"],
            bytecode=self.lockable_token_compiled["<stdin>:LockableToken"]["bin"])
        tx_hash = LockableToken.constructor().transact()
        tx_receipt = self.w3.eth.waitForTransactionReceipt(tx_hash)
        self.assertIsNotNone(tx_receipt)

    def test_deploy_mintable_token(self):
        # Deploy the MintableToken contract
        MintableToken = self.w3.eth.contract(
            abi=self.mintable_token_compiled["<stdin>:MintableToken"]["abi"],
            bytecode=self.mintable_token_compiled["<stdin>:MintableToken"]["bin"])
        tx_hash = MintableToken.constructor().transact()
        tx_receipt = self.w3.eth.waitForTransactionReceipt(tx_hash)
        self.assertIsNotNone(tx_receipt)

    def test_deploy_lock_and_mint(self):
        # Deploy the LockAndMint contract
        LockAndMint = self.w3.eth.contract(
            abi=self.lock_and_mint_compiled["<stdin>:LockAndMint"]["abi"],
            bytecode=self.lock_and_mint_compiled["<stdin>:LockAndMint"]["bin"])
        tx_hash = LockAndMint.constructor().transact()
        tx_receipt = self.w3.eth.waitForTransactionReceipt(tx_hash)
        self.assertIsNotNone(tx_receipt)

if __name__ == '__main__':
    unittest.main()
```