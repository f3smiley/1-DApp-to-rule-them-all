go
package main

import (
	"log"
	"os"
	"os/exec"
	"path/filepath"
)

func main() {
	setupBesuNode()
}

func setupBesuNode() {
	// Define the path to the Besu executable
	besuPath := "/path/to/besu"

	// Define the path to the Besu configuration file
	configPath := "/path/to/config/hyperledger-bisu-node-config.json"

	// Define the path to the data directory
	dataDir := "/path/to/data/dir"

	// Define the network id
	networkId := "138"

	// Define the rpc http port
	rpcHttpPort := "8545"

	// Define the p2p port
	p2pPort := "30303"

	// Define the host
	host := "127.0.0.1"

	// Define the command to start the Besu node
	cmd := exec.Command(besuPath, "--config-file", configPath, "--data-path", dataDir, "--network-id", networkId, "--rpc-http-enabled", "--rpc-http-api", "ETH,NET,WEB3", "--host-whitelist", "*", "--rpc-http-cors-origins", "all", "--rpc-http-host", host, "--rpc-http-port", rpcHttpPort, "--p2p-port", p2pPort)

	// Set the correct output and error pipes
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	// Start the Besu node
	err := cmd.Start()
	if err != nil {
		log.Fatalf("Failed to start Besu node: %s", err)
	}

	log.Printf("Besu node started with PID %d", cmd.Process.Pid)
}
```