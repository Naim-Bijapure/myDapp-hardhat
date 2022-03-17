import { Provider } from "@ethersproject/abstract-provider";
import { ethers, providers } from "ethers";
import React, { useEffect, useState } from "react";
import ItemManager_JSON from "../artifacts/contracts/ItemManager.sol/ItemManager.json";
import Item from "../artifacts/contracts/Item.sol/Item.json";

// import SimpleStorage from "./SimpleStorage.json";
import "../App.css";
import { ItemManager, ItemManager__factory } from "../typechain";

// import { ItemManager } from "./typechain";

const ITEM_MANAGER_CONTRACT_ADDRESS = "0xa0F8bFF5d34f08611Acd467Eb5b19647715E1fCA";
const N1_address = "0x44B12FFd9C135fD88bD42522989Edf58988ba693";
const STEPS = {
    0: "Created",
    1: "Paid",
    2: "Delivered",
};

function ManageItems() {
    const [provider, setProvider] = useState<providers.Web3Provider>();
    const [signer, setSigner] = useState<any>();
    const [totalItems, setTotalItems] = useState<any>(0);
    const [ItemManagerContract, setItemManagerContract] = useState<ItemManager>();
    const [itemsList, setItemsList] = useState<any[]>();

    useEffect(() => {
        onMetamaskInit();
    }, []);

    const onMetamaskInit = async () => {
        try {
            const provider = new providers.Web3Provider((window as any).ethereum);
            const signer = provider?.getSigner(0);

            const ItemManager = ItemManager__factory.connect(ITEM_MANAGER_CONTRACT_ADDRESS, signer);
            // let itemCount = (await ItemManager?.itemsCount()).toNumber();
            let itemCount = await getItemCount(ItemManager);

            setTotalItems(() => itemCount);
            setItemManagerContract(ItemManager);
            setSigner(signer);
            setProvider(provider);

            await loadItems(ItemManager, itemCount);
        } catch (error) {
            console.error(error);
        }
    };

    const getItemCount = async (ItemManager: ItemManager): Promise<number> => {
        let itemCount = (await ItemManager?.itemsCount()).toNumber();
        return itemCount;
    };

    const onTest = async () => {
        // NOTE: TO DEPLOY A CONTRACT
        // let itemManagerInterface = new ethers.utils.Interface(ItemManager.abi);
        // let accounts = await provider?.listAccounts();
        // let signer = provider?.getSigner(accounts![0]);
        // let itemManagerContract = new ethers.ContractFactory(itemManagerInterface, ItemManager.bytecode, signer);
        // let itemManagerDeploy: ethers.Contract = await itemManagerContract.deploy();
        // console.log("itemManagerDeploy: ", itemManagerDeploy.address);
        /* /--------------------------*/
        // TO GET A CONTRACT FROM ADDRESS
        // let accounts = await provider?.listAccounts();
        // let signer: any = provider?.getSigner();
        // const ItemManagerContract = new ethers.Contract(ITEM_MANAGER_CONTRACT_ADDRESS, ItemManager_JSON.abi, signer);
        // console.log("ItemManagerContract: ", ItemManagerContract);
        // let createdItem = await ItemManagerContract.functions["creatItem(string,uint256)"](
        //     "item_1",
        //     ethers.utils.parseEther("0.00001")
        // );
        // console.log("createdItem: ", createdItem);
        /* /--------------------------*/
        // let signer: any = provider?.getSigner();
        // NOTE: CONNECT WITH TYPCHAIN FACTORY FUNCTIONS
        // const im = ItemManager__factory.connect(ITEM_MANAGER_CONTRACT_ADDRESS, signer as any);
        // const data: ContractTransaction = await im.creatItem("item_1", ethers.utils.parseEther("0.00001"));
        // let rctp: ContractReceipt = await data.wait();
        // console.log("rctp: ", rctp);
        // // console.log('data: ', );
        // const items = await im.items(0);
        let accounts = await provider?.listAccounts();
        const signer = provider?.getSigner(0);

        // const ItemManager = ItemManager__factory.connect(ITEM_MANAGER_CONTRACT_ADDRESS, signer as any);
        // // let createdItem = await ItemManager.creatItem("cool", ethers.utils.parseEther("0.00001"), {
        // //     from: accounts![1],
        // // });
        // // console.log("createdItem: ", createdItem);
        // // console.log('ethers.utils.parseEther("0.00001"): ', ethers.utils.parseEther("0.00001"));
        // let items = await ItemManager.creatItem("cool", ethers.utils.parseEther("0.00001"));
        // let itemCount = await ItemManager.itemsCount();
        // console.log("itemCount: ", itemCount);
        // console.log("items: ", items);

        // // NOTE: DEPLOY WITH TYPCHAIN METHODS
        // let itemManagerInterface = new ethers.utils.Interface(ItemManager_JSON.abi);
        // const ItemManager_N = new ItemManager__factory(itemManagerInterface, ItemManager_JSON.bytecode, signer);
        // let d = ItemManager_N.deploy();
        // // // console.log("D ", (await d).address);
        // const IM_address = (await d).address;
        // console.log("IM_address: ", IM_address);

        // // const ItemManager = ItemManager__factory.connect("0xa0F8bFF5d34f08611Acd467Eb5b19647715E1fCA", signer as any);
        // const ItemManager = ItemManager__factory.connect(IM_address, signer as any);
        // // let createdItem = await ItemManager.creatItem("cool", ethers.utils.parseEther("0.00001"), {
        // //     from: accounts![1],
        // // });
        // // console.log("createdItem: ", createdItem);
        // // console.log('ethers.utils.parseEther("0.00001"): ', ethers.utils.parseEther("0.00001"));
        // let items = await ItemManager.creatItem("cool", ethers.utils.parseEther("0.00001"));
        // let itemCount = await ItemManager.itemsCount();
        // console.log("itemCount: ", itemCount.toNumber());
        // console.log("items: ", items);
    };

    const onDeploy = async () => {
        const signer = provider?.getSigner();
        let itemManagerInterface = new ethers.utils.Interface(ItemManager_JSON.abi);
        const ItemManager_N = new ItemManager__factory(itemManagerInterface, ItemManager_JSON.bytecode, signer);
        let d = ItemManager_N.deploy();
        // // console.log("D ", (await d).address);
        const IM_address = (await d).address;
        console.log(" deploy IM_address: ", IM_address);
    };

    const onDebug = async () => {
        // let itemCount: any = (await ItemManagerContract?.itemsCount())?.toNumber();
        // console.log("itemCount: ", itemCount);
    };

    const onCreateItem = async () => {
        let createItemTx = await ItemManagerContract?.creatItem("cool", ethers.utils.parseEther("0.00001"));
        let createItemReciept = await createItemTx?.wait();
        console.log("createItemReciept: ", createItemReciept?.events);
        let itemCount = (await ItemManagerContract?.itemsCount())?.toNumber();
        setTotalItems(itemCount);

        await loadItems(ItemManagerContract, itemCount as any);
    };

    const onPayItem = async (itemIndex: ethers.BigNumberish, itemPrice: any) => {
        // const itemIndex = 0;
        const item = await ItemManagerContract?.items(itemIndex);
        const itemAddress = item?._item;
        console.log("itemAddress: ", itemAddress);
        const itemContract = new ethers.Contract(itemAddress as any, Item.abi, signer);

        let accounts = await provider?.listAccounts();
        const itemTx = await itemContract.signer.sendTransaction({
            from: accounts![0],
            to: itemAddress,
            // value: ethers.utils.parseEther("0.00001"),
            value: ethers.utils.parseEther(`${itemPrice}`),
        });
        const itemRcpt = await itemTx.wait();
        console.log("itemRcpt: ", itemRcpt);
        await loadItems(ItemManagerContract, totalItems);
    };
    const loadItems = async (ItemManager: ItemManager | undefined, itemCount: number) => {
        const arr = Array.from(new Array(itemCount), (x, i) => Number(i));
        console.log("arr: ", arr);
        const items: any = [];
        await Promise.all(
            arr.map(async (itemIndex) => {
                const item = await ItemManager?.items(itemIndex);
                const itemPrice = ethers.utils.formatEther(item?._priceInWei as any);
                items.push({
                    itemIndex: itemIndex + 1,
                    itemName: item?._identifier,
                    itemStep: item?._step,
                    itemPrice: itemPrice,
                });
            })
        );

        console.log("items: ", items);
        setItemsList(items);
    };
    const deliverItem = () => {};

    return (
        <div className="App">
            <div>MetaMask</div>
            <div>
                <button onClick={() => {}}>debug</button>
                <button onClick={onCreateItem}>creatItem</button>
                {/* <button onClick={onPayItem}>pay item</button> */}
                <hr />
                <div>total items are {totalItems}</div>

                <div>item list</div>
                <hr />
                <table style={{ width: "100%" }}>
                    <thead>
                        <tr>
                            <th>item index</th>
                            <th>item name </th>
                            <th>item step </th>
                            <th>item price </th>
                            <th>action </th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemsList?.map((itemData) => {
                            return (
                                <tr
                                    key={itemData.itemIndex}
                                    onClick={() => {
                                        onPayItem(itemData.itemIndex, itemData.itemPrice);
                                    }}
                                >
                                    <td>{itemData.itemIndex}</td>
                                    <td>{itemData.itemName}</td>
                                    <td>{STEPS[itemData.itemStep]}</td>
                                    <td>{itemData.itemPrice}</td>
                                    <td>
                                        <button>pay</button>
                                        <button>deliver</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ManageItems;
