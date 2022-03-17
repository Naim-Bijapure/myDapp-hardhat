import { ethers, upgrades } from "hardhat";

async function main() {
    const N2_contract = await ethers.getContractFactory("N2");
    const n2_upgrade = await upgrades.upgradeBeacon("0x5932b253f52E27653A36eBDB269760017fEa2F1F", N2_contract);
    console.log("n2_upgrade: beacon upgrade  ", n2_upgrade.address);
}

main().catch((err) => {
    console.log("err: ", err);
    process.exitCode = 1;
});
