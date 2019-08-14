const Web3 = require("web3");
const express = require("express");
const cors = require("cors");
const app = express();

const TelegramFuturesToken = require("../build/contracts/TelegramFuturesToken.json");
const TelegramToken = require("../build/contracts/TelegramToken.json");

const port = 1337;
const networkId = 1337;
const account = "0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0";
const contractOptions = {
  from: account,
  gas: 200000,
  gasPrice: 20
};
const localProviderUrl = "http://localhost:8545";
const localProvider = new Web3.providers.WebsocketProvider(localProviderUrl);
const web3 = new Web3(localProvider);

const futuresContractAddress = TelegramFuturesToken.networks[networkId].address;
const futuresAbi = TelegramFuturesToken.abi;
const targetContractAddress = TelegramToken.networks[networkId].address;
const targetAbi = TelegramToken.abi;

const telegramFutures = new web3.eth.Contract(
  futuresAbi,
  futuresContractAddress,
  contractOptions
);

const telegram = new web3.eth.Contract(
  targetAbi,
  targetContractAddress,
  contractOptions
);

const handleTransferEvent = event => {
  if (event.logIndex > 0) {
    const { from, value } = event.returnValues;
    telegram.methods
      .transfer(from, value)
      .send()
      .then(result => console.log("transfer", result))
      .catch(console.error);
  }
};

telegramFutures.events
  .Transfer({
    filter: { to: "0x0000000000000000000000000000000000000000" }
  })
  .on("data", handleTransferEvent)
  .on("error", console.error);

app.use(cors());

app.get("/contracts", (req, res) =>
  res.send({
    futures: {
      abi: futuresAbi,
      address: futuresContractAddress
    },
    target: {
      abi: targetAbi,
      address: targetContractAddress
    }
  })
);

app.listen(port, () => console.log(`Server listening on port ${port}!`));
