// SPDX-License-Identifier: MIT
// pragma solidity >=0.4.22 <0.9.0;
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC777/ERC777Upgradeable.sol";

// NOTE: TO CONVERT VALUES TO STRING
import "@openzeppelin/contracts/utils/Strings.sol";
import "hardhat/console.sol";

contract MyToken777 is Initializable, OwnableUpgradeable, ERC777Upgradeable {
    // contract MyToken is ERC20 {
    string public tokenName;
    string public mySymbol;

    event MyLog(string action, string data, string value);

    // constructor(uint256 initialSupply) ERC20("MyToken", "N") {
    //     _mint(msg.sender, initialSupply);
    // }

    function initialize(
        string memory _tokenName,
        string memory _tokenSymbol,
        uint256 initialSupply,
        address[] memory defaultOperators
    )
        public
        virtual
        // address[] memory defaultOperators
        initializer
    {
        tokenName = _tokenName;
        mySymbol = _tokenSymbol;
        console.log("mySymbol: ", mySymbol);
        console.log("tokenName: cool man ", tokenName);
        console.log("initialSupply: ", initialSupply);

        __Ownable_init();
        __ERC777_init(tokenName, mySymbol, defaultOperators);
        _mint(msg.sender, initialSupply, "", "");
    }

    // function totalSupply() public view virtual override returns (uint256) {
    //     return 10;
    // }

    function addToken(uint256 amount) public onlyOwner {
        emit MyLog("init token", Strings.toHexString(uint256(uint160(address(msg.sender)))), Strings.toString(amount));

        _mint(msg.sender, amount, "", "");
    }
}
