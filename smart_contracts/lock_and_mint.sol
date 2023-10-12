```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract LockAndMint is ERC20 {
    AggregatorV3Interface internal priceFeed;
    address public lockableTokenAddress;
    address public mintableTokenAddress;

    constructor(address _lockableTokenAddress, address _mintableTokenAddress, address _priceFeed) ERC20("LockAndMint", "LAM") {
        lockableTokenAddress = _lockableTokenAddress;
        mintableTokenAddress = _mintableTokenAddress;
        priceFeed = AggregatorV3Interface(_priceFeed);
    }

    function lockTokens(uint256 _amount) public {
        ERC20(lockableTokenAddress).transferFrom(msg.sender, address(this), _amount);
        mintTokens(_amount);
    }

    function mintTokens(uint256 _amount) private {
        uint256 exchangeRate = getExchangeRate();
        uint256 mintAmount = _amount * exchangeRate;
        ERC20(mintableTokenAddress).mint(msg.sender, mintAmount);
    }

    function unlockTokens(uint256 _amount) public {
        ERC20(mintableTokenAddress).burnFrom(msg.sender, _amount);
        uint256 exchangeRate = getExchangeRate();
        uint256 unlockAmount = _amount / exchangeRate;
        ERC20(lockableTokenAddress).transfer(msg.sender, unlockAmount);
    }

    function getExchangeRate() public view returns (uint256) {
        (,int price,,,) = priceFeed.latestRoundData();
        return uint256(price);
    }
}
```