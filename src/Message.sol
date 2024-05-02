// SPDX-License-Identifier: TestNodit

pragma solidity ^0.8.19;

contract Message {
    string public message;
    function setMessage(string memory _message) public {
        message = _message;
    }

    function getMessage() public view returns (string memory){
        return message;
    }

    function initMessage() public {
        message = '';
    }
}
