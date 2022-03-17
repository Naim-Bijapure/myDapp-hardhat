import { ethers, upgrades } from "hardhat";

async function main() {
    const N1_CONTRACT_ADDR = "0x17eC1761a9c561cf7CcdbA74E77bFA43e9f9E8f4";
    const N2_CONTRACT = await ethers.getContractFactory("N2");
    const n2 = upgrades.upgradeProxy(N1_CONTRACT_ADDR, N2_CONTRACT);

    console.log("upgraded n2: deployed at ", (await n2).address);
}

main().catch((err) => {
    console.log("err: ", err);
    process.exitCode = 1;
});
