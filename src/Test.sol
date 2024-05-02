pragma solidity ^0.8.0;

contract Example {

    mapping(address => string) public message;

    // 올바른 사용: calldata를 사용
    function externalFunction(string calldata data) external pure returns (string memory) {
        return data;
    }

    // 잘못된 사용: memory를 사용 - 이는 컴파일 에러를 일으킵니다.
    function incorrectExternalFunction(string memory data) external pure returns (string memory) {
        return data;
    }
    
    function externalTest(string calldata yourText) external returns (bool) {
      string memory initMessage = 'Nodit';
      string memory newText = string(abi.encodePacked(yourText,initMessage));
      message[msg.sender] = newText;
      return true;
    }
}