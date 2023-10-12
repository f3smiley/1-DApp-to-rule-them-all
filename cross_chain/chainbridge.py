```python
from chainbridge import ChainBridge

class CrossChainBridge:
    def __init__(self, ethereum_network, polygon_network):
        self.ethereum_network = ethereum_network
        self.polygon_network = polygon_network
        self.bridge = ChainBridge(ethereum_network, polygon_network)

    def transfer_token(self, from_address, to_address, amount, token_contract_address):
        if self.bridge.is_token_registered(token_contract_address):
            return self.bridge.transfer_token(from_address, to_address, amount, token_contract_address)
        else:
            raise Exception("Token contract is not registered on the bridge")

    def register_token(self, token_contract_address):
        if not self.bridge.is_token_registered(token_contract_address):
            return self.bridge.register_token(token_contract_address)
        else:
            raise Exception("Token contract is already registered on the bridge")

    def is_token_registered(self, token_contract_address):
        return self.bridge.is_token_registered(token_contract_address)
```