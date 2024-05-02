// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {Diablo} from "../src/Diablo.sol";

contract DiabloTest is Test {
    Diablo public diablo;

    function setUp() public {
      diablo = new Diablo();
    }
    function testFuzz_whosYourBoss() public view {
      string memory myAct = "four";
      string memory myBoss = diablo.whosYourBoss(myAct);
      assertEq(myBoss, "Diablo");

    }

}