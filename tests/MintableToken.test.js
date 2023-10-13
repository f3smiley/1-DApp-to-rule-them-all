const assert = require('assert');
const Web3 = require('web3');
const MintableToken = artifacts.require("MintableToken");

contract("MintableToken", accounts => {
  let mintableToken;
  const owner = accounts[0];
  const user = accounts[1];

  beforeEach(async () => {
    mintableToken = await MintableToken.new({ from: owner });
  });

  it("should mint tokens correctly", async () => {
    const initialBalance = await mintableToken.balanceOf(user);
    assert.equal(initialBalance, 0, "Initial balance should be 0");

    await mintableToken.mint(user, 100, { from: owner });

    const finalBalance = await mintableToken.balanceOf(user);
    assert.equal(finalBalance, 100, "Final balance should be 100 after minting");
  });

  it("should not allow non-owners to mint tokens", async () => {
    try {
      await mintableToken.mint(user, 100, { from: user });
      assert.fail("Expected revert not received");
    } catch (error) {
      const revertFound = error.message.search('revert') >= 0;
      assert(revertFound, `Expected "revert", got ${error} instead`);
    }
  });

  it("should burn tokens correctly", async () => {
    await mintableToken.mint(user, 100, { from: owner });

    const initialBalance = await mintableToken.balanceOf(user);
    assert.equal(initialBalance, 100, "Initial balance should be 100");

    await mintableToken.burn(50, { from: user });

    const finalBalance = await mintableToken.balanceOf(user);
    assert.equal(finalBalance, 50, "Final balance should be 50 after burning");
  });

  it("should not allow burning more tokens than balance", async () => {
    await mintableToken.mint(user, 100, { from: owner });

    try {
      await mintableToken.burn(200, { from: user });
      assert.fail("Expected revert not received");
    } catch (error) {
      const revertFound = error.message.search('revert') >= 0;
      assert(revertFound, `Expected "revert", got ${error} instead`);
    }
  });
});