import { ethers, upgrades } from "hardhat";

async function main() {
    const N1_CONTRACT_ADDR = "0x17eC1761a9c561cf7CcdbA74E77bFA43e9f9E8f4";
    const N3_CONTRACT = await ethers.getContractFactory("N3");
    const n3 = upgrades.upgradeProxy(N1_CONTRACT_ADDR, N3_CONTRACT);

    console.log("upgraded n3: deployed at ", (await n3).address);
}

main().catch((err) => {
    console.log("err: ", err);
    process.exitCode = 1;
});
