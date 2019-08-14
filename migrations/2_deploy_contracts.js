const TelegramFuturesToken = artifacts.require("./TelegramFuturesToken.sol");
const TelegramToken = artifacts.require("./TelegramToken.sol");

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(TelegramFuturesToken, { from: accounts[0] });
  await TelegramFuturesToken.deployed();

  await deployer.deploy(TelegramToken, { from: accounts[1] });
  await TelegramToken.deployed();
};
