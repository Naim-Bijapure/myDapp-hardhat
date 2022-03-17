// SPDX-License-Identifier: MIT
// pragma solidity >=0.4.21 <8.10.0;
pragma solidity ^0.8.9;

contract SimpleStorage {
    uint256 public storedData;
    event Log(string operation, uint256 data);

    function set(uint256 x) public {
        storedData = x;
        emit Log("set_operation", storedData);
    }

    function get() public view returns (uint256) {
        return storedData;
    }
}
