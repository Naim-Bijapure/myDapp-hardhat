import { ethers, upgrades } from "hardhat";

async function main() {
    const N1_contract = await ethers.getContractFactory("N1");
    const beacon = await upgrades.deployBeacon(N1_contract);
    console.log("N1_beacon: deployed at ", beacon.address);
    // 0x5932b253f52E27653A36eBDB269760017fEa2F1F

    const n1 = await upgrades.deployBeaconProxy(beacon, N1_contract, [10]);
    console.log("n1:deployed at ", n1.address);
    // 0x0e051c3580316e1174897E318F9Fa4E5AD667184
}

main().catch((err) => {
    console.log("err: ", err);
    process.exitCode = 1;
});
