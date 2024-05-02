// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/ERC20.sol";

contract ERC20Script is Script {

    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        uint256 amount = 10000000000;
        vm.startBroadcast(deployerPrivateKey);
        new TestToken(amount, "TestContractToken", "TCT");
        vm.stopBroadcast();
    }
}