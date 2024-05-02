// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Test {
  struct MyTest {
  address Address;
  bytes32 Message;
  }
  address private owner;
  MyTest private mine;

  constructor(bytes32 _message) {
      owner = msg.sender;
      
      mine = MyTest(msg.sender, keccak256(abi.encodePacked(_message)));
  }

  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  function getInfo() public view onlyOwner returns(bytes32){
    return mine.Message;
  }

  function compare(bytes32 _message) public onlyOwner view returns (bool) {
    bytes32 myText = keccak256(abi.encodePacked(_message));
    bytes32 myMessage = getInfo();
    if(myText == myMessage) {
      return true;
    } else {
      revert();
    }
  }  
  function changeMessage(bytes32 _oldMessage, bytes32 _newMessage) public onlyOwner returns (bool, bytes32) {
    bytes32 oldText = getInfo();
    if(oldText != _oldMessage) {
      revert();
    } else {
      mine = MyTest(msg.sender, _newMessage);
      return (true, _newMessage);
    }
  }
}