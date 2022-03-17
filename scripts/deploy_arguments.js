import hre, { ethers } from "hardhat";
let verfify = await hre.run("verify:verify", {
    address: deployed.address,
    constructorArguments: ["cool"],
});

console.log("verfify: ", verfify);
