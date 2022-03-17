import { expect } from "chai";
import { Contract, ContractReceipt, ContractTransaction, constants } from "ethers/lib/ethers";
import { ethers, upgrades } from "hardhat";
import {
    singletons, // Common constants, like the zero address and largest integers
} from "@openzeppelin/test-helpers";

import { MyDataFeed, MyRandomNumber, MyToken777 } from "../client/src/typechain";

const { formatEther, parseEther } = ethers.utils;

describe.skip("MY RANDOME NUMBER", async () => {
    let myRandomNumber: Contract | MyRandomNumber;
    let accounts = await ethers.provider.listAccounts();
    let accountA = accounts[0];
    let accountB = accounts[1];

    const MOCK_SUBSCRIPTION_ID = 0;
    const MOCK_LINK = constants.AddressZero;

    it.only("Deploy my   contract", async function () {
        const contractInstance = await ethers.getContractFactory("MyRandomNumber");

        const vrfCoordFactory = await ethers.getContractFactory("MockVRFCoordinator");
        const mockVrfCoordinator = await vrfCoordFactory.deploy();

        myRandomNumber = await contractInstance.deploy(mockVrfCoordinator.address, MOCK_LINK, MOCK_SUBSCRIPTION_ID);
        console.log("myRandomNumber: ", myRandomNumber.address);
    });

    it.only("GET RANDOM NUMBER", async () => {
        let dataTx: ContractTransaction = await myRandomNumber.requestRandomWords();
        let dataRcpt: ContractReceipt = await dataTx.wait();

        let randomNumberTx = await myRandomNumber.s_randomWords(0);
        console.log("randomNumberTx: ", randomNumberTx);
    });
});
