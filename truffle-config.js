const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

module.exports = {
    networks: {
        development: {
            provider: () => new HDWalletProvider(
                process.env.MNEMONIC, // Fetch mnemonic from your .env file
                "http://127.0.0.1:7545" // URL of your Ganache instance
            ),
            network_id: '*', // Match any network id
        },
    },
    compilers: {
        solc: {
            version: "0.8.21", // Specify the Solidity version
        },
    },
};
