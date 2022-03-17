import { ethers, upgrades } from "hardhat";

async function main() {
    const N1_contract = await ethers.getContractFactory("N1");
    const n1 = upgrades.deployProxy(N1_contract, [10]);
    console.log("n1: deployed at ", (await n1).address);
}

main().catch((err) => {
    console.log("err: ", err);
    process.exitCode = 1;
});
