```Dockerfile
# Use the official Chainlink image as the base image
FROM smartcontract/chainlink:chain-138
# Set the working directory in the container
WORKDIR /chainlink
# Copy the local config file to the working directory in the container
COPY config/hyperledger-besu-node-config.json .env
# Expose the necessary ports
EXPOSE 6688 8080
# Run the Chainlink node
CMD ["chainlink", "node", "start", "--network", "defi-oracle-mainnet"]
EXPOSE 6688 8080
```
