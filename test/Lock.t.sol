// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {Lock} from "../src/Lock.sol";

contract LockTest is Test {
    Lock public lock;

    uint public oneYearInSec = 365 * 24 * 60 * 60;
    uint public lockedAmount = 1_000_000_000;
    uint public currentTime;
    uint public unlockTime;
    address public owner;
    function setUp() public {
        owner = msg.sender;
        currentTime = vm.getBlockTimestamp();
        unlockTime = currentTime + oneYearInSec;
        vm.prank(owner);
        lock = new Lock{value : 1}(unlockTime);
    }

    function test_checkingUnlockTime() public view {
      uint checkingTime = lock.unlockTime();
      assertEq(checkingTime, unlockTime);
    }

    function test_contractBalance() public view {
      assertEq(address(lock).balance, 1);
    }

    function test_transferToOwner() public {
      vm.warp(unlockTime + 1);
      uint initialBalance = owner.balance;
      vm.prank(owner);
      lock.withdraw();
      uint finalBalance = owner.balance;
      assertEq(finalBalance, initialBalance + 1);
    }
    function test_revertAnotherAccount() public {
      vm.warp(unlockTime + 1);
      vm.expectRevert();
      vm.prank(0x7cEC14E06aC1966B365A8B67FbC15298f868FB9A);
      lock.withdraw();
    }
}
