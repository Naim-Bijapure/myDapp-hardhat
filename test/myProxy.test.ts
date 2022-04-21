import { TransactionReceipt } from "@ethersproject/abstract-provider";
import { expect } from "chai";
import { ContractTransaction } from "ethers";
import { ethers } from "hardhat";

describe.skip("My proxy ", function () {
    it.only("deploy my proxy and check", async function () {
        const Example_Contract = await ethers.getContractFactory("Example");
        const example = await Example_Contract.deploy();
        console.log("myProxy: address ", example.address);

        const Dispatcher_Contract = await ethers.getContractFactory("Dispatcher");
        const dispatcher = await Dispatcher_Contract.deploy(example.address);
        console.log("dispatcher: address ", dispatcher.address);

        let accounts = await ethers.provider.listAccounts();
        let dispatchTx = await dispatcher.signer.sendTransaction({
            from: accounts[0],
            to: dispatcher.address,
        });
        let dispatchRcpt: TransactionReceipt = await dispatchTx.wait();

        let getUnitValue = await example.getUint();
        console.log("getUnitValue: ", getUnitValue);

        let setUnitValueTx: ContractTransaction = await example.setUint(444);
        let setUnitRecpt = await setUnitValueTx.wait();

        getUnitValue = await example.getUint();
        console.log("getUnitValue: ", getUnitValue);

        const Example_Contract_updated = await ethers.getContractFactory("Example");
        const example_updated = await Example_Contract_updated.deploy();
        console.log("myProxy updated: address ", example_updated.address);

        let replaceTx = await dispatcher.replace(example_updated.address);
        let replaceRcpt = await replaceTx.wait();
        console.log("replaceRcpt: ", replaceRcpt.events);

        getUnitValue = await example_updated.getUint();
        console.log("getUnitValue: ", getUnitValue);
    });
});
