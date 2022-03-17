// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./ItemManager.sol";

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

import "@openzeppelin/contracts/utils/Strings.sol";

contract Item {
    uint256 public priceInWei;
    uint256 public paidWei;
    uint256 public index;
    ItemManager parentContract;

    event ItemLog(string sender_addr, string actionName, string actionValue);

    constructor(
        ItemManager _parentContract,
        uint256 _priceInWei,
        uint256 _index
    ) {
        priceInWei = _priceInWei;
        index = _index;
        parentContract = _parentContract;
    }

    receive() external payable {
        // NOTE: from address to stirng and value to string
        emit ItemLog(
            Strings.toHexString(uint256(uint160(address(msg.sender)))),
            "receivee",
            Strings.toString(msg.value)
        );
        require(msg.value == priceInWei, "We dont support partial payments");
        require(paidWei == 0, "Item  is already paid !");
        paidWei += msg.value;
        (bool success, ) = address(parentContract).call{value: msg.value}(
            abi.encodeWithSignature("triggerPayment(uint256)", index)
        );

        require(success, "Delivery did not work");
    }

    fallback() external payable {}
}
