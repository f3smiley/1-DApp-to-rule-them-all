```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LockableToken is ERC20 {
    mapping(address => uint256) private _locks;

    event Locked(address indexed user, uint256 amount);
    event Unlocked(address indexed user, uint256 amount);

    constructor() ERC20("LockableToken", "LKT") {}

    function lock(uint256 amount) public {
        require(amount <= balanceOf(msg.sender), "Not enough tokens to lock");
        _locks[msg.sender] += amount;
        _burn(msg.sender, amount);
        emit Locked(msg.sender, amount);
    }

    function unlock(uint256 amount) public {
        require(amount <= _locks[msg.sender], "Not enough tokens to unlock");
        _locks[msg.sender] -= amount;
        _mint(msg.sender, amount);
        emit Unlocked(msg.sender, amount);
    }

    function locksOf(address account) public view returns (uint256) {
        return _locks[account];
    }
}
```