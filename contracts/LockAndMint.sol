```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./LockableToken.sol";
import "./MintableToken.sol";
import "@openzeppelin/contracts/utils/ChainId.sol";

contract LockAndMint {
    LockableToken public lockableToken;
    MintableToken public mintableToken;
    AggregatorV3Interface internal priceFeed;

    constructor(address _lockableToken, address _mintableToken, address _priceFeed) {
        require(ChainId.getChainId() == 138, "This contract is only for DeFi Oracle Mainnet (Chain 138)");
        lockableToken = LockableToken(_lockableToken);
        mintableToken = MintableToken(_mintableToken);
        priceFeed = AggregatorV3Interface(_priceFeed);
    }

    function lockTokens(uint256 _amount) public {
        require(lockableToken.balanceOf(msg.sender) >= _amount, "Not enough tokens to lock");
        lockableToken.transferFrom(msg.sender, address(this), _amount);
        emit LockEvent(msg.sender, _amount);
    }

    function mintTokens() public {
        uint256 lockedAmount = lockableToken.balanceOf(address(this));
        require(lockedAmount > 0, "No tokens to mint");
        (,int price,,,) = priceFeed.latestRoundData();
        uint256 mintAmount = lockedAmount * uint256(price);
        mintableToken.mint(msg.sender, mintAmount);
        emit MintEvent(msg.sender, mintAmount);
    }

    event LockEvent(address indexed user, uint256 amount);
    event MintEvent(address indexed user, uint256 amount);
}
```
