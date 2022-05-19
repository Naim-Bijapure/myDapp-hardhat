import { expect, assert } from "chai";
import { Contract, Transaction } from "ethers";
import { formatEther, parseEther } from "ethers/lib/utils";
import { ethers, upgrades } from "hardhat";
import { N1 } from "../client/src/typechain";

describe("ON CREATE 2", function () {
    let accounts: string[], accountA, accountB;
    beforeEach(async () => {
        accounts = await ethers.provider.listAccounts();
        accountA = accounts[0];
        accountB = accounts[1];
    });
    it("it should create create 2", async function () {
        // const myCreate2_contract = await ethers.getContractFactory("MyCreate2");
        // const myCreate2 = myCreate2_contract.deploy(accountA);
        // let myCreate2_address = (await myCreate2).address;
        // console.log("myCreate2_address: ", myCreate2_address);

        // const myCreate2_factory_contract = await ethers.getContractFactory("MyCreate2Factory");
        // const myCreate2_factory = myCreate2_factory_contract.deploy();
        // let myCreate2_factory_address = (await myCreate2_factory).address;
        // console.log("myCreate2_factory_address: ", myCreate2_factory_address);

        // let accountASigner = await ethers.getSigner(accountA);

        // async function getBalance() {
        //     let myCreate2_balance = await (await ethers.provider.getBalance(myCreate2_address)).toString();
        //     console.log("myCreate2_balance: ", formatEther(myCreate2_balance));
        //     let accountA_balance = await accountASigner.getBalance();
        //     console.log("accountA_balance: ", formatEther(accountA_balance.toString()));
        // }
        // await getBalance();

        // let tx = await accountASigner.sendTransaction({
        //     from: accountA,
        //     to: myCreate2_address,
        //     value: parseEther("100"),
        // });
        // let rcpt = await tx.wait();

        // await getBalance();
    });
});
