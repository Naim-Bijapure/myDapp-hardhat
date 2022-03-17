// SPDX-License-Identifier: MIT
// pragma solidity >=0.4.22 <0.9.0;
pragma solidity ^0.8.9;
// import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "./N1.sol";

contract N2 is N1 {
    address public ownerAddr2;
    string public myData2;
    int256 public myNum2;

    event MyLog2(address indexed sender, string message, string parentValue);

    // constructor() {
    //     // owner = msg.sender;
    // }
    function initialize(int256 _x) public override {
        N1.initialize(_x);
        ownerAddr2 = msg.sender;
        myData2 = "from 2 ";
        myNum2 = _x;
    }

    event MyLog2(address indexed sender, string message);

    function changeData2(string memory data) public payable onlyOwner {
        myData2 = data;

        emit MyLog2(msg.sender, "cool data change from 2", N1.myData);
    }
}
