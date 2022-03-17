import { TransactionReceipt, TransactionResponse } from "@ethersproject/abstract-provider";
import { expect } from "chai";
import { BigNumber, Contract, ContractFactory, ContractReceipt, ContractTransaction } from "ethers";
import { ethers, upgrades } from "hardhat";
import Item from "../client/src/artifacts/contracts/Item.sol/Item.json";
import { ItemManager } from "../client/src/typechain";

describe.skip("Item manager", function () {
    let ItemManager: Contract | ItemManager;

    const getItem = async (itemManager, itemIndex) => {
        const item: [string, number, string, BigNumber] & {
            _item: string;
            _step: number;
            _identifier: string;
            _priceInWei: BigNumber;
        } = await ItemManager.items(itemIndex);

        console.log("item: ", item);
        return item;
    };

    it.only("Deploy upgradable  contract", async function () {
        const item_manager_contract: any = await ethers.getContractFactory("ItemManager");
        ItemManager = await upgrades.deployProxy(item_manager_contract, []);

        console.log("ItemManager.address: ", ItemManager.address);
        expect(ItemManager.address).is.not.empty;
    });

    it.only("should create item", async function () {
        const data = {
            amount: ethers.utils.parseEther("0.000000000001"),
        };

        // NOTE:a traansactions and receipt flow with log
        let createTx: ContractTransaction = await ItemManager.creatItem("item 1", data.amount);
        const createRcpt: ContractReceipt = await createTx.wait();
        console.log("createRcpt: log ", createRcpt.events![0].args);
        const itemIndex = createRcpt.events![0].args!["_itemIndex"];
        console.log("itemIndex: ", itemIndex.toNumber());

        // const item: [string, number, string, BigNumber] & {
        //     _item: string;
        //     _step: number;
        //     _identifier: string;
        //     _priceInWei: BigNumber;
        // } = await ItemManager.items(itemIndex);
        const item = await getItem(ItemManager, itemIndex);

        const itemContractAddress = item._item;
        //NOTE:GET ACCOUNTS AND SIGNERES
        const accounts = await ethers.getSigners();
        const mainSigner = accounts[0];
        const mainAccount = accounts[0].address;

        // NOTE: TO GET A SPECIFIC CONTRACT AND SEND ETH AS TRANSCACTION
        const item_contract = await ethers.getContractAt("Item", itemContractAddress, mainSigner);
        let itemTransaction: TransactionResponse = await item_contract.signer.sendTransaction({
            from: mainAccount,
            to: itemContractAddress,
            value: data.amount,
        });

        // NOTE: READ FROM A TRANSCACTIONS AND PARSE LOGS
        let itemRcpt: TransactionReceipt = await itemTransaction.wait();
        let itemInterface = new ethers.utils.Interface(Item.abi);
        itemRcpt.logs.forEach((log) => {
            if (log.address === item_contract.address) {
                // console.log('log.address: matched ', log.address);
                console.log("log: ", itemInterface.parseLog(log));
            }
        });

        const item_updated = await getItem(ItemManager, itemIndex);

        // NOTE: TO LISTEN ON EVENT
        // item_contract.on("ItemLog", (from, to, amount, event) => {
        //     console.log("event: ", event);
        // });

        //NOTE: TO GET ALL LOGS ON A CONTRACS
        // ethers.provider.getLogs(item_contract).then((logs) => {
        //     // console.log("logs: ", logs);
        // });

        let deliveryTx: ContractTransaction = await ItemManager.triggerDelivery(itemIndex);
        let deliveryReceipt: ContractReceipt = await deliveryTx.wait();
        console.log("deliveryReceipt: ", deliveryReceipt.events![0].args);
        await getItem(ItemManager, itemIndex);
    });
});
