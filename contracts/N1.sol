// SPDX-License-Identifier: MIT
// pragma solidity >=0.4.22 <0.9.0;
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract N1 is Initializable, OwnableUpgradeable {
    address public ownerAddr;

    string public myData;
    int256 public myNum;
    mapping(address => uint256) public MyMap;

    // bool private initialized;

    // constructor() {
    //     // owner = msg.sender;
    // }
    function initialize(int256 _x) public virtual initializer {
        __Ownable_init();
        ownerAddr = msg.sender;
        myData = "cool from 1 yo";
        myNum = _x;
    }

    event MyLog(address indexed sender, string message);

    function changeData(string memory data) public payable onlyOwner {
        myData = data;
        MyMap[msg.sender] = msg.value;

        emit MyLog(msg.sender, "cool data change from 1 ");
    }
}
