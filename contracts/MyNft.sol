// SPDX-License-Identifier: MIT
// pragma solidity >=0.4.22 <0.9.0;
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
// import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";

import "@openzeppelin/contracts/utils/Strings.sol";
import "hardhat/console.sol";

contract MyNFT is Initializable, OwnableUpgradeable, ERC721URIStorageUpgradeable {
    // contract MyToken is ERC20 {
    string public tokenName;
    string public mySymbol;
    using CountersUpgradeable for CountersUpgradeable.Counter;

    CountersUpgradeable.Counter private _tokenIds;

    event MyLog(string action, string data, string value);

    // constructor(uint256 initialSupply) ERC20("MyToken", "N") {
    //     _mint(msg.sender, initialSupply);
    // }

    function initialize(string memory _tokenName, string memory _tokenSymbol) public virtual initializer {
        tokenName = _tokenName;
        mySymbol = _tokenSymbol;
        console.log("mySymbol: ", mySymbol);
        console.log("tokenName: cool man ", tokenName);

        __ERC721_init(tokenName, mySymbol);

        // _mint(msg.sender, amount);

        __Ownable_init();
    }

    function createNft(address player, string memory tokenURI) public returns (uint256) {
        console.log("tokenURI: ", tokenURI);
        console.log("player: ", player);

        _tokenIds.increment();
        console.log("_tokenIds:increamented ", _tokenIds.current());
        uint256 newItemId = _tokenIds.current();
        _mint(player, newItemId);
        console.log("tokenURI: ", tokenURI);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}
