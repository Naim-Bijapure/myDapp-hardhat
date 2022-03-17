import { expect } from "chai";
import { Contract, ContractReceipt, ContractTransaction } from "ethers/lib/ethers";
import { ethers, upgrades } from "hardhat";
//NOTE:CHECKOUT THIS TEST HELPERS
import {
    singletons, // Common constants, like the zero address and largest integers
} from "@openzeppelin/test-helpers";

import { MyDataFeed, MyToken777 } from "../client/src/typechain";

const { formatEther, parseEther } = ethers.utils;

describe.skip("MY DATA FEED", async () => {
    let myDataFeed: Contract | MyDataFeed;
    //     let accounts = await ethers.provider.listAccounts();
    //     console.log("accounts: ", accounts);
    //     let accountA = accounts[0];
    //     let accountB = accounts[1];
    it.only("Deploy my   contract", async function () {
        console.log("Deploy my   contract");
        const contractInstance = await ethers.getContractFactory("MyDataFeed");
        myDataFeed = await contractInstance.deploy();
        let INIT_SUPPLY = ethers.utils.parseEther("100");
        // await singletons.ERC1820Registry(accounts[0]);
        myDataFeed = await upgrades.deployProxy(contractInstance, []);
        console.log("myDataFeed: ", myDataFeed.address);
        expect(myDataFeed.address).is.not.empty;
    });

    it.only("GET PRICE FEED", async () => {
        // let dataFeedPrice = await myDataFeed.getLatestPrice();
        // console.log("dataFeedPrice: ", ethers.utils.formatUnits("259026321468", 8));
    });
});
