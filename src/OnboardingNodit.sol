// SPDX-License-Identifier: Lambda256-Ben
pragma solidity ^0.8.19;

contract OnboardingNodit {
  
  string public slogan = "BUILD IT, SCALE IT, NODIT";
  string public serviceSite = "https://nodit.io";
  string public docs = "https://developer.nodit.io";

  function getNoditSlogan() public view returns (string memory){
    return slogan;
  }

  function getNoditServiceSite() public view returns (string memory){
    return serviceSite;
  }

  function getNoditDocs() public view returns (string memory){
    return docs;
  }
  function joinToNodit(string memory userName) public pure returns (string memory) {
    string memory newMember = string(abi.encodePacked("Welcome ",userName));
    return newMember;
  }
}