import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "@openzeppelin/hardhat-upgrades";
import "hardhat-watcher";
import "@nomiclabs/hardhat-web3";

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(account.address);
    }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
    solidity: "0.8.9",
    // defaultNetwork: "ganache",
    defaultNetwork: "hardhat",

    networks: {
        ropsten: {
            url: "https://ropsten.infura.io/v3/d7d49f3bcbd943b6bceb4a7549cd1bb0",
            accounts: ["d8bc935f06c027c7e0edeedcc46593554dbb3e9e01101f4f3b8ab69e36e2e484"],
        },

        ganache: {
            url: process.env.GANACHE_UI || "",

            // accounts: [
            //   "47a61ed2e56358f553545287567348ee1038ff57b78f5414bb3f265d2dd7ec4d",
            //   "c099626706f33543129a3824dbe9257538ad49a4065878843ed18dad453d52ed",
            // ],
        },
        // hardhat: {
        //     forking: {
        //         enabled: true,

        // NOTE:to connect with mainnet
        //         url: "https://eth-mainnet.alchemyapi.io/v2/1ohvNfneAjG9dqzC57_8rxHBN2jRwBJ7",
        //         blockNumber: 14357849,
        //     },
        // },
        rinkeby: {
            url: "https://rinkeby.infura.io/v3/d7d49f3bcbd943b6bceb4a7549cd1bb0", //Infura url with projectId
            accounts: ["d8bc935f06c027c7e0edeedcc46593554dbb3e9e01101f4f3b8ab69e36e2e484"],
        },
    },
    gasReporter: {
        enabled: process.env.REPORT_GAS !== undefined,
        currency: "USD",
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY,
    },
    watcher: {
        compilation: {
            tasks: ["compile"],
        },
        test: {
            tasks: [{ command: "test", params: { testFiles: ["{path}"] } }],
            files: ["./test/**/*"],
            verbose: true,
        },
    },
    paths: {
        sources: "./contracts",
        artifacts: "./client/src/artifacts",
    },
    typechain: {
        outDir: "client/src/typechain",
        target: "ethers-v5",
    },
};

export default config;
