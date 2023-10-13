```Dockerfile
# Use an official Hyperledger Besu runtime as a parent image
FROM hyperledger/besu:latest

# Set the working directory in the container
WORKDIR /hyperledger-bisu-node

# Copy the local package files to the container's workspace
ADD . /hyperledger-bisu-node

# Install any needed packages specified in requirements.txt
RUN apt-get update && apt-get install -y \
    openjdk-11-jre-headless \
    && rm -rf /var/lib/apt/lists/*

# Make port 8545 available to the world outside this container
EXPOSE 8545

# Run besu when the container launches
CMD ["besu", "--network=dev", "--rpc-http-enabled", "--rpc-http-api=ETH,NET,WEB3", "--data-path=/tmp/tmpDatdir"]
```