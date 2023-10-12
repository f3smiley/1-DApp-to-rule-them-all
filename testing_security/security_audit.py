```python
import os
from mythril.mythril import Mythril
from mythril.ether import util
from mythril.analysis import solver
from mythril.analysis.report import Report
from mythril.analysis.security import get_detection_modules
from mythril.exceptions import MythrilException

def run_security_audit():
    # Define the smart contracts
    contracts = ["lockable_token.sol", "mintable_token.sol", "lock_and_mint.sol", "oracle_contracts.sol"]

    # Loop through each contract
    for contract in contracts:
        # Define the contract path
        contract_path = os.path.join("smart_contracts", contract)

        # Create a Mythril object
        mythril = Mythril()

        # Load the contract
        try:
            mythril.load_from_file(contract_path)
        except MythrilException as e:
            print(f"Failed to load contract {contract}: {e}")
            continue

        # Get the detection modules
        modules = get_detection_modules()

        # Create a report
        report = Report()

        # Loop through each module
        for module in modules:
            # Run the module
            issues = module.execute(mythril)

            # Add the issues to the report
            for issue in issues:
                report.add_issue(issue)

        # Print the report
        print(report.as_text())

if __name__ == "__main__":
    run_security_audit()
```