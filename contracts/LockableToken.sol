```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LockableToken is ERC20, Ownable {
    bool public locked = false;

    constructor(uint256 initialSupply) ERC20("LockableToken", "LKT") {
        _mint(msg.sender, initialSupply);
    }

    function lock() public onlyOwner {
        locked = true;
    }

    function unlock() public onlyOwner {
        locked = false;
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal override {
        require(!locked, "ERC20: token transfer while locked");
        super._beforeTokenTransfer(from, to, amount);
    }
}
```