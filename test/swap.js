const truffleAssert = require("truffle-assertions");

const TelegramFuturesToken = artifacts.require("TelegramFuturesToken");
const TelegramToken = artifacts.require("TelegramToken");

contract("Swap", function(accounts) {
  let telegramFutures;
  let telegram;
  const account = accounts[0];

  beforeEach(async () => {
    telegramFutures = await TelegramFuturesToken.new({ from: account });
    telegram = await TelegramToken.new({ from: account });
  });

  it("swaps token", async () => {
    const balance = await telegramFutures.balanceOf.call(account);
    const balance2 = await telegram.balanceOf.call(account);
    console.log(balance.toString());
    console.log(balance2.toString());

    // console.log(t.address);

    // await tf.burn(100);

    // const contractBalance = await t.balanceOf.call(t.address);
    // console.log({ contractBalance: contractBalance.toString() });

    // const tx = await telegramFutures.burn(100, { from: account });
    const tx = await telegramFutures.swap({ from: account });

    truffleAssert.eventEmitted(tx, "Swap", ev => {
      console.log(ev);
    });

    // const balanceAfter = await tf.balanceOf.call(accounts[0]);
    // const balanceAfter2 = await t.balanceOf.call(accounts[0]);
    // console.log(balanceAfter.toString());
    // console.log(balanceAfter2.toString());

    assert.isTrue(true);
  });
});
