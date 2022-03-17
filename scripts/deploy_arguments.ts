
import hre, { ethers } from "hardhat";

async function main() {
    let verfify = await hre.run("verify:verify", {
        address: "0xE97502006d75d6779d64943eCe84c8cc95c794bB",
        constructorArguments: ["cool"],
    });

    console.log("verfify: ", verfify);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
