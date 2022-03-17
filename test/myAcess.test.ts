import { TransactionReceipt } from "@ethersproject/abstract-provider";
import { expect } from "chai";
import { ContractTransaction } from "ethers";
import { ethers } from "hardhat";

describe.skip("MY ACCESS CONTROLE", function () {
    it.only("deploy my proxy and check", async function () {
        const myAccess_contract = await ethers.getContractFactory("MyAccess");

        let accounts = await ethers.provider.listAccounts();
        let accountA = accounts[0];
        let accountB = accounts[1];

        let myAccess = await myAccess_contract.deploy(accountA);
        console.log("myAccess: ", myAccess.address);

        let data = await myAccess.data();
        console.log("data: ", data);

        const myRole = await myAccess.MYROLE();
        // console.log("myRole: ", myRole);
        let checkRole = await myAccess.hasRole(myRole, accountA);
        console.log("adminRole: ", checkRole);

        const grantRoleTx = await myAccess.grantRole(myRole, accountB);
        const grantRoleRcpt = await grantRoleTx.wait();

        checkRole = await myAccess.hasRole(myRole, accountA);
        console.log("adminRole: ", checkRole);

        const singerB = await ethers.getSigner(accountB);
        myAccess = myAccess.connect(singerB);
        const updateDataTx = await myAccess.updateData("cool man");
        const updateDataRcpt = await updateDataTx.wait();

        // data = await myAccess.data();
        // console.log("data: ", data);
    });
});
