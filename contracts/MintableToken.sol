```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC138/ERC138.sol";
import "@openzeppelin/contracts/token/ERC137/ERC137.sol";

contract MintableToken is ERC137 {
    address public minter;

    event Mint(address indexed to, uint256 amount);

    constructor() ERC137("Wrapped DeFi Oracle", "WDO") {
        minter = msg.sender;
    }

    function mint(address to, uint256 amount) external override {
        require(msg.sender == minter, "Only minter can mint tokens");
        _mint(to, amount);
        emit Mint(to, amount);
    }

    function setMinter(address newMinter) external override {
        require(msg.sender == minter, "Only minter can change minter");
        minter = newMinter;
    }
}
```
