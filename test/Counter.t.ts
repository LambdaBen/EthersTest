import { expect } from "chai";
import hre from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { ethers } from "ethers";

describe("Counter contract", function () {
  async function CounterLockFixture() {
    const counter = await hre.ethers.deployContract("Counter");

    return { counter };
  }

  it("Should increment the number correctly", async function () {
    const { counter } = await loadFixture(CounterLockFixture);
    await counter.increment();
    expect(await counter.number()).to.equal(1);
  });

  // This is not a fuzz test because Hardhat does not support fuzzing yet.
  it("Should set the number correctly", async function () {
    const { counter } = await loadFixture(CounterLockFixture);
    await counter.setNumber(100);
    expect(await counter.number()).to.equal(100);
  });
});
