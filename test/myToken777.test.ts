import { expect } from "chai";
import { Contract, ContractReceipt, ContractTransaction } from "ethers/lib/ethers";
import { ethers, upgrades } from "hardhat";
//NOTE:CHECKOUT THIS TEST HELPERS
import {
    singletons, // Common constants, like the zero address and largest integers
} from "@openzeppelin/test-helpers";

import { MyToken777 } from "../client/src/typechain";

const { formatEther, parseEther } = ethers.utils;

describe.skip("ERC 777", async () => {
    let myToken777: Contract | MyToken777;
    let accounts = await ethers.provider.listAccounts();
    let accountA = accounts[0];
    let accountB = accounts[1];
    it.only("Deploy my   contract", async function () {
        const myToken_contract: any = await ethers.getContractFactory("MyToken777");
        myToken777 = await myToken_contract.deploy();

        let INIT_SUPPLY = ethers.utils.parseEther("100");
        await singletons.ERC1820Registry(accounts[0]);
        console.log("singletons: ", singletons);
        myToken777 = await upgrades.deployProxy(myToken_contract, ["myToken777", "N", INIT_SUPPLY, []]);
        console.log("myToken777: ", myToken777.address);
        expect(myToken777.address).is.not.empty;
    });
    it.only("TOKEN OPERATION", async () => {
        let SEND_AMOUNT = parseEther("100");
        console.log("accountA: ", accountA);
        console.log("accountB: ", accountB);

        // NOTE:on contract send it requires a reciepent to set
        const otherContract = await ethers.getContractFactory("Greeter");
        let demo_contract = await otherContract.deploy("cool");
        console.log("demo_contract: ", demo_contract.address);

        async function getBalances() {
            console.log("==============================");
            // check balance
            let accountABalance = await myToken777.balanceOf(accountA);
            let accountBBalance = await myToken777.balanceOf(accountB);
            let demoContractBalance = await myToken777.balanceOf(demo_contract.address);
            let totalSupply = await myToken777.totalSupply();

            console.log("account A Balance: ", formatEther(accountABalance));
            console.log("account B Balance: ", formatEther(accountBBalance));
            console.log("demo contract balance", formatEther(demoContractBalance));
            console.log("total Supply: ", formatEther(totalSupply));

            console.log("==============================");
        }

        await getBalances();

        let B__AMT = parseEther("50");
        let sendBTX: ContractTransaction = await myToken777.transfer(
            demo_contract.address,
            B__AMT
            // ethers.utils.formatBytes32String("cool man")
        );
        let sendBRCPT: ContractReceipt = await sendBTX.wait();
        console.log("sendBRCPT: ", sendBRCPT.events);

        sendBTX = await myToken777.send(accountB, B__AMT, ethers.utils.formatBytes32String("cool man"));
        sendBRCPT = await sendBTX.wait();
        console.log("sendBRCPT: ", sendBRCPT.events);

        await getBalances();
    });
});
