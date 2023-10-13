```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0; // Chain 1 Ethereum Mainnet

import "@openzeppelin/contracts/token/ERC20/ERC20.sol"; // Chain 1 Ethereum Mainnet
import "@openzeppelin/contracts/access/Ownable.sol"; // Chain 1 Ethereum Mainnet

contract LockableToken is ERC20, Ownable { // Chain 1 Ethereum Mainnet
    bool public locked = false;

    constructor(uint256 initialSupply) ERC20("LockableToken", "LKT") { // Chain 1 Ethereum Mainnet
        _mint(msg.sender, initialSupply);
    }

    function lock() public onlyOwner { // Chain 1 Ethereum Mainnet
        locked = true;
    }

    function unlock() public onlyOwner { // Chain 1 Ethereum Mainnet
        locked = false;
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal override { // Chain 1 Ethereum Mainnet
        require(!locked, "ERC20: token transfer while locked");
        super._beforeTokenTransfer(from, to, amount);
    }
}
```
