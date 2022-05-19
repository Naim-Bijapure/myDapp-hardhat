pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Create2.sol";

import "./MyCreate2Example.sol";

contract MyCreate2Factory {
    address public latestContractAddress;

    constructor() payable {
        // what should we do on deploy?
    }

    // function computeAddress(bytes memory _byteCode, uint256 _salt)
    //     public
    //     view
    //     returns (address)
    // {}

    function deployCreate2Contract(bytes32 salt, string memory startingPurpose)
        public
        payable
    {
        address payable contractAddress;

        // contractAddress = payable(
        //     Create2.deploy(
        //         msg.value,
        //         salt,
        //         abi.encodePacked(
        //             type(MyCreate2Example).creationCode,
        //             abi.encode(startingPurpose)
        //         )
        //     )
        // );

        // latestContractAddress = contractAddress;
        // console.log("latestContractAddress: ", latestContractAddress);
    }

    // to support receiving ETH by default
    receive() external payable {}

    fallback() external payable {}
}
