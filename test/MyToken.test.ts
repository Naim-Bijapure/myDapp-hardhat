import { TransactionReceipt, TransactionResponse } from "@ethersproject/abstract-provider";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract, ContractReceipt, ContractTransaction } from "ethers/lib/ethers";
import { ethers, upgrades } from "hardhat";
import { ItemManager, MyToken } from "../client/src/typechain";

const { formatEther, parseEther } = ethers.utils;

describe.skip("MY TOKEN", () => {
    let myToken: Contract | MyToken;
    it.only("Deploy my token  contract", async function () {
        const myToken_contract: any = await ethers.getContractFactory("MyToken");
        let DEFAULT_BALANCE = ethers.utils.parseEther("100");
        // myToken = await myToken_contract.deploy(DEFAULT_BALANCE);

        myToken = await upgrades.deployProxy(myToken_contract, ["MyToken", "N", DEFAULT_BALANCE]);
        console.log("mytoken.address: ", myToken.address);

        // const addToken = await myToken.add
        expect(myToken.address).is.not.empty;
    });
    it.only("TOKEN OPERATION", async () => {
        let accounts = await ethers.provider.listAccounts();
        let accountA = accounts[0];
        let accountB = accounts[1];
        let SEND_AMOUNT = parseEther("100");

        console.log("accountA: ", accountA);
        console.log("accountB: ", accountB);

        async function getBalances() {
            console.log("==============================");
            // check balance
            let accountABalance = await myToken.balanceOf(accountA);
            let accountBBalance = await myToken.balanceOf(accountB);
            let totalSupply = await myToken.totalSupply();

            console.log("account A Balance: ", formatEther(accountABalance));
            console.log("account B Balance: ", formatEther(accountBBalance));
            console.log("total Supply: ", formatEther(totalSupply));

            console.log("==============================");
        }

        await getBalances();

        console.log("********************** TRANSACTION A TO B ***********************");
        // approve A to B
        let approveATx: ContractTransaction = await myToken.approve(accountA, SEND_AMOUNT);
        let approveARcpt: ContractReceipt = await approveATx.wait();
        console.log("approveARcpt: ", approveARcpt.events![0].args);

        // allowance

        let A_ALLOWANCE_AMT = parseEther("50");
        let allowanceATx: ContractTransaction = await myToken.decreaseAllowance(accountA, A_ALLOWANCE_AMT);
        let allowARcpt: ContractReceipt = await allowanceATx.wait();
        console.log("allowARcpt: ", allowARcpt.events![0].args);

        let allownseA = await myToken.allowance(accountA, accountA);
        console.log("allownseA: ", formatEther(allownseA));

        // transer

        let transferTokenATxn: ContractTransaction = await myToken.transferFrom(accountA, accountB, A_ALLOWANCE_AMT);
        let transferTokenARecpt: ContractReceipt = await transferTokenATxn.wait();
        console.log("transferTokenARecpt: ", transferTokenARecpt.events![0].args);

        // check balance
        await getBalances();

        console.log("********************** TRANSACTION B TO A ***********************");
        console.log("B allowance");

        let B_ALLOWANCE_AMT = parseEther("50");

        let approveBTx: ContractTransaction = await myToken.approve(accountB, SEND_AMOUNT);
        let approveBRcpt: ContractReceipt = await approveBTx.wait();
        console.log("approveARcpt: ", approveBRcpt.events![0].args);

        let accountBsigner: SignerWithAddress = await ethers.getSigner(accountB);
        console.log("accountBsigner: ", accountBsigner.address);

        myToken = myToken.connect(accountBsigner);

        let allowanceBTx: ContractTransaction = await myToken.increaseAllowance(accountB, B_ALLOWANCE_AMT);
        let allowBRcpt: ContractReceipt = await allowanceBTx.wait();
        console.log("allowBRcpt: ", allowBRcpt.events![0].args);

        let allownseB = await myToken.allowance(accountB, accountB);
        console.log("allownseB: ", formatEther(allownseB));

        await getBalances();

        let transferTokenBTxn: ContractTransaction = await myToken.transferFrom(accountB, accountA, B_ALLOWANCE_AMT);

        let transferTokenBRecpt: ContractReceipt = await transferTokenBTxn.wait();
        console.log("transferTokenBRecpt: ", transferTokenBRecpt.events![0].args);

        await getBalances();
    });
});
