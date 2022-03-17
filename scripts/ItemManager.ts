import { ethers, upgrades } from "hardhat";

async function main() {
    const ItemManagerContract = await ethers.getContractFactory("ItemManager");
    const itemManagerDeployed = upgrades.deployProxy(ItemManagerContract, []);
    console.log("itemManagerDeployed ", (await itemManagerDeployed).address);
}

main().catch((err) => {
    console.log("err: ", err);
    process.exitCode = 1;
});
