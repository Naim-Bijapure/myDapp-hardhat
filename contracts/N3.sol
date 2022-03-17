// SPDX-License-Identifier: MIT
// pragma solidity >=0.4.22 <0.9.0;
pragma solidity ^0.8.9;
// import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "./N1.sol";

contract N3 is N1 {
    address public ownerAddr2;
    string public myData2;
    int256 public myNum2;
    int256 public myNum3;
    string public myData3;
    address public ownerAddr3;

    enum MyEnum {
        data1,
        data2
    }
    MyEnum public myEnum;

    //     event MyLog2(address indexed sender, string message, string parentValue);
    event MyLog3(address indexed sender, string message, MyEnum myEnum);

    // constructor() {
    //     // owner = msg.sender;
    // }
    function initialize(int256 _x) public override {
        N1.initialize(_x);
        ownerAddr3 = msg.sender;
        myData3 = "from 3";
        myNum3 = _x;
    }

    event MyLog2(address indexed sender, string message);

    function changeData2(string memory data) public payable onlyOwner {
        myData3 = data;
	myEnum = MyEnum.data1;
	

        emit MyLog3(msg.sender, N1.myData,myEnum);
    }
}
