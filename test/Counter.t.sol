// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {Counter} from "../src/Counter.sol";

contract CounterTest is Test {
    Counter public counter;

    function setUp() public {
        counter = new Counter();
        counter.setNumber(10);
    }

    function test_Increment() public {
        counter.increment();
        assertEq(counter.number(), 11);
    }

    function testFuzz_SetNumber(uint256 x) public {
        counter.setNumber(x);
        assertEq(counter.number(), x);
    }

        function testFuzz_Decrease() public {
        counter.decrement();
        assertEq(counter.number(), 9);
    }
}
