// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract MyCreate2Example {
    string public data = "default data";
    address payable owner;

    constructor() payable {
        owner = payable(address(msg.sender));
    }

    function updateData(string memory _data) public {
        console.log("this is block coinbase", block.coinbase);
        console.log(" to update data is _data: ", _data);
        data = _data;
    }

    receive() external payable {
        console.log("on  receive: ");
    }
}
