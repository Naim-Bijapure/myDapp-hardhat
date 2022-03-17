// SPDX-License-Identifier: MIT
// pragma solidity >=0.4.22 <0.9.0;
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";


import "./Item.sol";

contract ItemManager is Initializable, OwnableUpgradeable {
    enum SupplyChainSteps {
        Created,
        Paid,
        Delivered
    }

    struct S_Item {
        Item _item;
        SupplyChainSteps _step;
        string _identifier;
        uint256 _priceInWei;
    }

    mapping(uint256 => S_Item) public items;

    uint256 public index;
    uint256 public itemsCount;


    event SupplyChainStepsEvent(
        uint256 _itemIndex,
        uint256 _step,
        address _address
    );

    event MyLog(address n_sender, uint256 value, address item_addr);

    function initialize() public virtual initializer {
        __Ownable_init();
    }

    function creatItem(string memory _identifier, uint256 _priceInWei)
        public
        onlyOwner
    {
        Item item = new Item(this, _priceInWei, index);

        items[index]._item = item;
        items[index]._priceInWei = _priceInWei;
        items[index]._step = SupplyChainSteps.Created;
        items[index]._identifier = _identifier;

        emit SupplyChainStepsEvent(
            index,
            uint256(items[index]._step),
            address(item)
        );
        index++;
        itemsCount =index;
    }

    function triggerPayment(uint256 _index) public payable {
        Item item = items[_index]._item;

        emit MyLog(msg.sender, msg.value, address(item));
        // uint256 A = 10;
        // require(A == _index, "both are not equal");
        require(
            address(item) == msg.sender,
            "Only items are allowed to update themeselves "
        );
        require(items[_index]._priceInWei <= msg.value, "Not fully  paid");
        require(
            items[_index]._step == SupplyChainSteps.Created,
            "Item is further in the  supply chain"
        );
        items[_index]._step = SupplyChainSteps.Paid;
        emit SupplyChainStepsEvent(
            _index,
            uint256(items[_index]._step),
            address(item)
        );
    }

    function triggerDelivery(uint256 _index) public onlyOwner {
        require(
            items[_index]._step == SupplyChainSteps.Paid,
            "Item is further in the supply chain cool"
        );
        items[_index]._step = SupplyChainSteps.Delivered;

        emit SupplyChainStepsEvent(
            _index,
            uint256(items[_index]._step),
            address(items[_index]._item)
        );
    }

    function checkN(uint256 _index) public returns (string memory) {
        emit MyLog(msg.sender, _index, msg.sender);
        return ("cool");
    }
}
