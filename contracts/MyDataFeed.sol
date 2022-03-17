// SPDX-License-Identifier: MIT
// pragma solidity >=0.4.22 <0.9.0;
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

import "hardhat/console.sol";

contract MyDataFeed is Initializable, OwnableUpgradeable {
    event MyLog(address indexed sender, string message);
    AggregatorV3Interface internal priceFeed;

    // bool private initialized;

    // constructor() {
    //     // owner = msg.sender;
    // }
    function initialize() public virtual initializer {
        priceFeed = AggregatorV3Interface(0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419);

        __Ownable_init();
    }

    function getLatestPrice() public view returns (int256) {
        (uint80 roundID, int256 price, uint256 startedAt, uint256 timeStamp, uint80 answeredInRound) = priceFeed
            .latestRoundData();
        console.log("priceFeed: ", Strings.toHexString(uint256(uint160(address(priceFeed)))));

        console.log("answeredInRound: ", answeredInRound);
        return price;
        // return 100;
    }
}
