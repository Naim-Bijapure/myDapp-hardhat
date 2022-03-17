// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "hardhat/console.sol";

contract MyAccess is AccessControl {
    bytes32 public constant MYROLE = keccak256("MYROLE");

    string public data = "default data";

    constructor(address N) {
        _setupRole(DEFAULT_ADMIN_ROLE, N);
    }

    function updateData(string memory _data) public onlyRole(MYROLE) {
        console.log("this is block coinbase", block.coinbase);
        console.log(" to update data is _data: ", _data);
        data = _data;
    }
}
