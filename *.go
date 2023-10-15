
package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"os/exec"
)

func main() {
	http.HandleFunc("/", handler)
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func handler(w http.ResponseWriter, r *http.Request) {
	cmd := exec.Command("besu", "--network=defi-oracle-mainnet", "--rpc-http-enabled")

	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	err := cmd.Start()
	if err != nil {
		log.Printf("Command finished with error: %v", err)
	}

	fmt.Fprintf(w, "Besu node started on defi-oracle-mainnet (Chain 138)")
}
