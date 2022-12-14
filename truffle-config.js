

const HDWalletProvider = require('@truffle/hdwallet-provider');

const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();
const bscscan_api_key = fs.readFileSync(".bscscan_api_key").toString().trim();
const etherscan_API_KEY = fs.readFileSync(".etherscan_API_KEY").toString().trim();

module.exports = {

 plugins: ["truffle-plugin-verify"],
    api_keys: {
      etherscan: etherscan_API_KEY,
    },
    //          bscscan: bscscan_api_key


/*
 // truffle migrate --network NetworkName

npm install -D truffle-plugin-verify
truffle run verify contractName@contractAdress --network NetworkName
*/

  networks: {

    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/28ee68a21d1d44ce8e1fbd5f029cdcc4`),
      network_id: 3,       // Ropsten's id
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      confirmations: 2,    // # of confirmations to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
    kovan: {
      provider: () => new HDWalletProvider(mnemonic, `https://kovan.infura.io/v3/28ee68a21d1d44ce8e1fbd5f029cdcc4`),
      network_id: 42,
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/28ee68a21d1d44ce8e1fbd5f029cdcc4`),
      network_id: 4,
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    bscTestnet: {
      provider: () => new HDWalletProvider(mnemonic, `https://data-seed-prebsc-1-s1.binance.org:8545`),
      network_id: 97,
      // gas: 5500000,
      // confirmations: 2,
      // timeoutBlocks: 200,
      skipDryRun: true
    },

  },

  // Set default mocha options here, use special reporters, etc.
  mocha: {
    // timeout: 100000
  },

  compilers: {
    solc: {
      version: "0.8.15",

    }
  },




};

