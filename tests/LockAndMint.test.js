const assert = require('assert');
const Web3 = require('web3');
const LockAndMint = artifacts.require('./LockAndMint.sol');
const LockableToken = artifacts.require('./LockableToken.sol');
const MintableToken = artifacts.require('./MintableToken.sol');

contract('LockAndMint', (accounts) => {
  let lockAndMint, lockableToken, mintableToken;
  const owner = accounts[0];
  const user = accounts[1];

  beforeEach(async () => {
    lockableToken = await LockableToken.new({ from: owner });
    mintableToken = await MintableToken.new({ from: owner });
    lockAndMint = await LockAndMint.new(lockableToken.address, mintableToken.address, { from: owner });
  });

  it('should lock tokens', async () => {
    await lockableToken.transfer(user, 100, { from: owner });
    await lockableToken.approve(lockAndMint.address, 100, { from: user });
    await lockAndMint.lockTokens(user, 100, { from: user });

    const balance = await lockableToken.balanceOf(user);
    assert.equal(balance.toString(), '0');
  });

  it('should mint tokens', async () => {
    await lockableToken.transfer(user, 100, { from: owner });
    await lockableToken.approve(lockAndMint.address, 100, { from: user });
    await lockAndMint.lockTokens(user, 100, { from: user });
    await lockAndMint.mintTokens(user, 100, { from: user });

    const balance = await mintableToken.balanceOf(user);
    assert.equal(balance.toString(), '100');
  });

  it('should handle exchange rate from Chainlink oracle', async () => {
    const exchangeRate = await lockAndMint.getExchangeRate();
    assert.equal(exchangeRate.toString(), '100');
  });
});