import { TransactionReceipt, TransactionResponse } from "@ethersproject/abstract-provider";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract, ContractReceipt, ContractTransaction } from "ethers/lib/ethers";
import { ethers, upgrades } from "hardhat";
import { ItemManager, MyNFT, MyToken } from "../client/src/typechain";

const { formatEther, parseEther } = ethers.utils;

describe.skip("MY NFT", () => {
    let myNFT: Contract | MyNFT;
    it.only("Deploy my token  contract", async function () {
        const myToken_contract = await ethers.getContractFactory("MyNFT");
        myNFT = await myToken_contract.deploy();
        myNFT = await upgrades.deployProxy(myToken_contract, ["myNFT", "N"]);
        console.log("mytoken.address: ", myNFT.address);
        expect(myNFT.address).is.not.empty;
    });
    it.only("TOKEN OPERATION", async () => {
        let accounts = await ethers.provider.listAccounts();
        let accountA = accounts[0];
        let accountB = accounts[1];
        let SEND_AMOUNT = parseEther("100");

        console.log("accountA: ", accountA);
        console.log("accountB: ", accountB);

        const createNFt: ContractTransaction = await myNFT.createNft(accountA, "cool man from A");
        const createNFtTx: ContractReceipt = await createNFt.wait();
        console.log("createNFtTx: ", createNFtTx.events![0].args);

        // owener of
        let owner = await myNFT.ownerOf(1);
        console.log("owner: ", owner);

        let tokenURI = await myNFT.tokenURI(1);
        console.log("tokenURI: ", tokenURI);

        let transferTX: ContractTransaction = await myNFT.transferFrom(accountA, accountB, 1);
        let transferRCPT: ContractReceipt = await transferTX.wait();
        console.log("transferRCPT: ", transferRCPT.events);

        owner = await myNFT.ownerOf(1);
        console.log("owner: ", owner);

        // async function getBalances() {
        //     console.log("==============================");
        //     // check balance
        //     let accountABalance = await myNFT.balanceOf(accountA);
        //     let accountBBalance = await myNFT.balanceOf(accountB);
        //     let totalSupply = await myNFT.totalSupply();

        //     console.log("account A Balance: ", formatEther(accountABalance));
        //     console.log("account B Balance: ", formatEther(accountBBalance));
        //     console.log("total Supply: ", formatEther(totalSupply));

        //     console.log("==============================");
        // }

        // await getBalances();
    });
});
