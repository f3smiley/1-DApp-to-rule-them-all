const assert = require('assert');
const Web3 = require('web3');
const LockableToken = artifacts.require("LockableToken");

contract('LockableToken', (accounts) => {
  let lockableToken;
  const owner = accounts[0];
  const user = accounts[1];

  beforeEach(async () => {
    lockableToken = await LockableToken.new({ from: owner });
  });

  it('should deploy the contract and mint tokens to owner', async () => {
    const balance = await lockableToken.balanceOf(owner);
    assert.equal(balance, 1000000, "Initial balance is incorrect");
  });

  it('should allow users to lock tokens', async () => {
    await lockableToken.transfer(user, 1000, { from: owner });
    await lockableToken.lockTokens(500, { from: user });
    const balance = await lockableToken.balanceOf(user);
    assert.equal(balance, 500, "Balance after locking is incorrect");
  });

  it('should emit a LockEvent when tokens are locked', async () => {
    await lockableToken.transfer(user, 1000, { from: owner });
    const receipt = await lockableToken.lockTokens(500, { from: user });
    assert.equal(receipt.logs[0].event, "LockEvent", "LockEvent not triggered");
    assert.equal(receipt.logs[0].args.value, 500, "LockEvent value is incorrect");
  });

  it('should not allow users to lock more tokens than they have', async () => {
    await lockableToken.transfer(user, 1000, { from: owner });
    try {
      await lockableToken.lockTokens(1500, { from: user });
      assert.fail("Expected revert not received");
    } catch (error) {
      const revertFound = error.message.search('revert') >= 0;
      assert(revertFound, `Expected "revert", got ${error} instead`);
    }
  });
});