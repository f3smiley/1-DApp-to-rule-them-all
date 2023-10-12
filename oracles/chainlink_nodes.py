```python
from chainlink import ChainlinkClient

class ChainlinkNode:
    def __init__(self, network, node_address):
        self.network = network
        self.node_address = node_address
        self.client = ChainlinkClient(node_address)

    def get_exchange_rate(self):
        return self.client.get_exchange_rate()

class ChainlinkNodesManager:
    def __init__(self):
        self.nodes = {}

    def add_node(self, network, node_address):
        self.nodes[network] = ChainlinkNode(network, node_address)

    def get_node(self, network):
        return self.nodes[network]

    def get_exchange_rate(self, network):
        node = self.get_node(network)
        return node.get_exchange_rate()

# Initialize Chainlink nodes manager
chainlink_nodes_manager = ChainlinkNodesManager()

# Add Ethereum and Polygon Chainlink nodes
chainlink_nodes_manager.add_node('ethereum', 'ethereum_chainlink_node_address')
chainlink_nodes_manager.add_node('polygon', 'polygon_chainlink_node_address')

# Get exchange rate from Ethereum Chainlink node
ethereum_exchange_rate = chainlink_nodes_manager.get_exchange_rate('ethereum')
print(f'Ethereum exchange rate: {ethereum_exchange_rate}')

# Get exchange rate from Polygon Chainlink node
polygon_exchange_rate = chainlink_nodes_manager.get_exchange_rate('polygon')
print(f'Polygon exchange rate: {polygon_exchange_rate}')
```