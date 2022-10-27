require("@nomiclabs/hardhat-waffle");

require("./tasks/test");
require("./tasks/moloch-tasks");
require("./tasks/pool-tasks");

// Go to https://www.alchemyapi.io, sign up, create
// a new App in its dashboard, and replace "KEY" with its key
const ALCHEMY_API_KEY = "KEY";

// Replace this private key with your Ropsten account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Be aware of NEVER putting real Ether into testing accounts
const ROPSTEN_PRIVATE_KEY = "fac50ba7eb2bcbf8c80abd07732abee20d8b0d30a4099cfe065e010d4cd212d7";

const MATIC_PRIVATE_KEY = "fac50ba7eb2bcbf8c80abd07732abee20d8b0d30a4099cfe065e010d4cd212d7"

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: 'localhost',
  solidity: {
    version:  "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 2000,
        details: {
          yul: true,
          yulDetails: {
            stackAllocation: true,
            optimizerSteps: "dhfoDgvulfnTUtnIf"
          }
        }
      }
    },
  },
  networks: {
    localhost: {
      deployedContracts: {
        moloch: '0xfaAddC93baf78e89DCf37bA67943E1bE8F37Bb8c',
        pool: '0x276C216D241856199A83bf27b2286659e5b877D3',
      }
    },
    ropsten: {
      url: `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`0x${ROPSTEN_PRIVATE_KEY}`]
    },
    mumbai: {
      url: `https://rpc-mumbai.maticvigil.com/`,
      accounts: [`0x${MATIC_PRIVATE_KEY}`],
      deployedContracts: {
        moloch: '0x00d74e2989Ea6931535B588A274414184F41E4D3',
      }
    },
  }
};

