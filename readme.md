# Token Swap Tool for Ethereum

### How it works

- the UI connects to MetaMask and gets your xGRAM and TON balances
- when you click 'Swap' this triggers a token burn of xGRAM
- server listens to burn events and sends back TON to the burner's address

### Requirements

- `truffle`
- `ganache-cli`
- `MetaMask` pointing to Ganache

### Installation

- `npm i`
- `cd server`
- `npm i`
- `cd ../client`
- `yarn`

### Running the tool

- have a ganache-cli instance running
- write down the first 2 accounts
- import the first account into MetaMask
- replace the value of `account` in `server/server.js` with the second
- run `truffle migrate` in the main directory
- run `node server` in the `server` directory
- run `yarn start` in the `client` directory
- hopefully the app will run and you will see a non-zero xGRAM balance
- click swap and watch the (almost) magic happen
