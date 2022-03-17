// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";

abstract contract Upgradeable {
    mapping(bytes4 => uint32) _sizes;
    address _dest;

    function initialize() public virtual;

    function replace(address target) public {
        _dest = target;
        target.delegatecall(
            abi.encodeWithSelector(bytes4(keccak256("initialize()")))
        );
    }
}

contract Dispatcher is Upgradeable {
    constructor(address target) {
        console.log("Dispatcher: constructor with address ", target);
        replace(target);
    }

    function initialize() public pure override {
        // Should only be called by on target contracts, not on the dispatcher
        assert(false);
    }

    fallback() external {
        console.log("fallback: ");
        bytes4 sig;
        assembly {
            sig := calldataload(0)
        }
        uint256 len = _sizes[sig];
        address target = _dest;

        assembly {
            // return _dest.delegatecall(msg.data)
            calldatacopy(0x0, 0x0, calldatasize())
            let result := delegatecall(
                sub(gas(), 10000),
                target,
                0x0,
                calldatasize(),
                0,
                len
            )
            return(0, len) //we throw away any return data
        }
    }
}

contract Example is Upgradeable {
    uint256 _value;

    function initialize() public override {
        console.log("initialize: with msg.sender ", msg.sender);
        _sizes[bytes4(keccak256("getUint()"))] = 32;
    }

    function getUint() public view returns (uint256) {
        return _value * 2;
    }

    function setUint(uint256 value) public {
        _value = value;
    }
}
