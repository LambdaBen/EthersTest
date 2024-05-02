// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.13;

contract Diablo {
    function whosYourBoss(string memory myAct) public pure returns(string memory){
        string memory yourBoss;
        bytes32 _myAct = keccak256(abi.encodePacked(myAct));
        bytes32 actOne = keccak256(abi.encodePacked("one"));
        bytes32 actTwo = keccak256(abi.encodePacked("two"));
        bytes32 actThree = keccak256(abi.encodePacked("three"));
        bytes32 actFour = keccak256(abi.encodePacked("four"));
        bytes32 actFive = keccak256(abi.encodePacked("five"));
        
        if(_myAct == actOne) {
            yourBoss = 'Andariel';
        } else if(_myAct == actTwo) {
            yourBoss = 'Duriel';
        } else if(_myAct == actThree) {
            yourBoss = 'Mephisto';
        } else if(_myAct == actFour) {
            yourBoss = 'Diablo';
        } else if(_myAct == actFive) {
            yourBoss = 'Ba`al';
        } else {
            yourBoss = "You are not a Diablo2 User, buy a Diablo2";
        }
    return yourBoss;
    }
}
