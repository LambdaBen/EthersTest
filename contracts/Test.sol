// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract BenContract {
  
  address public currentTokenDelegatedContract; 
  address public currentUserStatusContract;

  constructor(address _contractAddress) {
    currentTokenDelegatedContract = _contractAddress;
  }

  modifier onlyOwner(address userAddress) {
    require(userAddress == msg.sender, "You don't have an Authority");
    _;
  }


  function changeDelegatedContract(address _contractAddress) public onlyOwner(msg.sender) returns (bool) {
    require(_contractAddress != currentTokenDelegatedContract);
    currentTokenDelegatedContract = _contractAddress;
    return true;
  } 

  function getDelegatedContractAddress() public view returns (address) {
    return currentTokenDelegatedContract;
  }

  function delegateTransfer(address toAddress, uint256 amount) public returns (bool) {
    require(currentTokenDelegatedContract != address(0), "contractAddress is empty");
    (bool success, ) = currentTokenDelegatedContract.delegatecall(abi.encodeWithSignature("transfer(address,uint256)", toAddress, amount)); 
    return success;
  } 

function delegateGetBalance(address accountAddress) public returns (uint256) {
    (bool success, bytes memory data) = currentTokenDelegatedContract.call(abi.encodeWithSignature("balanceOf(address)", accountAddress));
    require(success, "Call Failed");
    return abi.decode(data, (uint256));
  }
}
