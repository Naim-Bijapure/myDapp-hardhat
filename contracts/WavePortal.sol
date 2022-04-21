// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;
    uint256 private seed;

    event NewWave(address indexed from, uint256 timeStamp, string message);

    struct Wave {
        address waver;
        string message;
        uint256 timestamp;
    }

    Wave[] waves;

    mapping(address => uint256) public lastWaveAt;

    constructor() payable {
        console.log("Yo yo, I am a contract and I am smart");

        seed = (block.timestamp + block.difficulty) % 100;
    }

    function wave(string memory _message) public {
        require(lastWaveAt[msg.sender] + 15 seconds < block.timestamp, "Wait 15 min");

        lastWaveAt[msg.sender] = block.timestamp;

        totalWaves += 1;
        console.log("%s has waved ", msg.sender);
        waves.push(Wave(msg.sender, _message, block.timestamp));

        emit NewWave(msg.sender, block.timestamp, _message);

        seed = (block.timestamp + block.difficulty) % 100;
        console.log("seed random number %d", seed);

        if (seed <= 50) {
            console.log("%s won!", msg.sender);

            uint256 prizeAmount = 0.0001 ether;
            require(prizeAmount <= address(this).balance, "trying to witdraw more money than contract has");

            (bool success, ) = (msg.sender).call{ value: prizeAmount }("");

            require(success, "Failed to withdraw money from contract");
        }
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("total waves are %d ", totalWaves);
        return totalWaves;
    }
}
