// SPDX-License-Identifier: Lambda-Ben
pragma solidity ^0.8.19;

import {Test, console} from "forge-std/Test.sol";
import {OnboardingNodit} from "../src/OnboardingNodit.sol";

contract OnboardingNoditTest is Test {
    OnboardingNodit public onboarding;

    function setUp() public {
      onboarding = new OnboardingNodit();
    }

    function test_slogan() public view { 
      string memory noditSlogan = onboarding.getNoditSlogan();
      string memory slogan = "BUILD IT, SCALE IT, NODIT";
      
      assertEq(noditSlogan, slogan);
    }

    function test_serviceSite() public view {
      string memory noditServiceSite = onboarding.getNoditServiceSite();
      string memory serviceSite = "https://nodit.io";
      
      assertEq(noditServiceSite, serviceSite);
    }

    function test_docs() public view {
      string memory noditDocs = onboarding.getNoditDocs();
      string memory docs = "https://developer.nodit.io";
      
      assertEq(noditDocs, docs);
    }
    
    function test_joinToNodit() public view {
      string memory newUserName = onboarding.joinToNodit("Ben");
      string memory expectName = "Welcome Ben";
      
      assertEq(newUserName, expectName);
    }
}