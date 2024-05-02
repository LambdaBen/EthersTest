// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

contract TestToken is ERC20 {
    constructor(uint256 initialSupply, string memory name, string memory symbol) ERC20(name, symbol) {
        _mint(msg.sender, initialSupply);
    }
}

contract Ben is TestToken {

  constructor(uint256 initialSupply, string memory name, string memory symbol)
    TestToken(initialSupply, name, symbol) {}

modifier onlyOwner(address _address) {
  require(msg.sender == _address, 'You are not the Owner');
  _;
}

  function specialAddMintingAndTransfer(address to, uint amount) public onlyOwner(msg.sender) returns(bool) {
    _mint(msg.sender, amount);
    _transfer(msg.sender, to, amount);
    return true;
  }
  function transformKeccak256(string memory words) public pure returns (bytes32) {
    bytes32 yourKeccak = keccak256(abi.encodePacked((words)));

    return yourKeccak;
  }

}