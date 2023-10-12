```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MintableToken is ERC20 {
    address public minter;

    event Mint(address indexed to, uint256 amount);

    constructor() ERC20("Wrapped Ethereum", "WETH") {
        minter = msg.sender;
    }

    function mint(address to, uint256 amount) external {
        require(msg.sender == minter, "Only minter can mint tokens");
        _mint(to, amount);
        emit Mint(to, amount);
    }

    function setMinter(address newMinter) external {
        require(msg.sender == minter, "Only minter can change minter");
        minter = newMinter;
    }
}
```