import { expect, assert } from "chai";
import { Contract, Transaction } from "ethers";
import { ethers, upgrades } from "hardhat";
import { N1 } from "../client/src/typechain";

describe.skip("N1", function () {
    let n1: Contract | N1, n2: Contract;
    it.only("Deploy upgradable  contract", async function () {
        const N1_contract: any = await ethers.getContractFactory("N1");
        n1 = await upgrades.deployProxy(N1_contract, [10]);

        const N2_contract: any = await ethers.getContractFactory("N2");
        n2 = await upgrades.upgradeProxy(n1.address, N2_contract);

        expect(n1.address).equal(n2.address);
    });

    it.only("update the data ", async function () {
        const toUpdateData = "update_data";
        //     update data
        let tx_1: Transaction = await n1.changeData(toUpdateData);
        let updatedData_1 = await n1.myData();
        expect(updatedData_1).to.equal(updatedData_1);

        let tx_2: Transaction = await n2.changeData(toUpdateData);
        let updatedData_2 = await n1.myData();
        expect(updatedData_2).to.equal(updatedData_2);
    });
});
