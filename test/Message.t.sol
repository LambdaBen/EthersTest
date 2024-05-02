// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {Message} from "../src/Message.sol";

contract TestMessage is Test {
    Message public text;

    function setUp() public {
        text = new Message();
    }

    function test_set_message(string memory _text) public {
        text.setMessage(_text);
        string memory _getMessage = text.getMessage();
        assertEq(_text, _getMessage);
    }

    function test_get_message() public view {
        text.getMessage();
    }

        function test_init() public {
            text.initMessage();
            string memory current_Message = text.getMessage();
            assertEq(current_Message, '');
    }
}
