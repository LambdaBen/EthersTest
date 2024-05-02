import { expect } from "chai";
import hre from "hardhat";
import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("Lock", async function () {
  async function deployOneYearLockFixture() {
    let lock: any;
    let unlockTime: number;
    let lockedAmount = 1_000_000_000;

    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

    lock = await hre.ethers.deployContract("Lock", [unlockTime], {
      value: lockedAmount,
    });

    return { lock, unlockTime, lockedAmount };
  }

  it("Should set the right unlockTime", async function () {
    const { lock, unlockTime } = await loadFixture(deployOneYearLockFixture);
    expect(await lock.unlockTime()).to.equal(unlockTime);
  });

  it("Should revert with the right error if called too soon", async function () {
    const { lock } = await loadFixture(deployOneYearLockFixture);
    await expect(lock.withdraw()).to.be.revertedWith("You can't withdraw yet");
  });

  it("Should transfer the funds to the owner", async function () {
    const { lock, unlockTime } = await loadFixture(deployOneYearLockFixture);
    const [owner] = await hre.ethers.getSigners();

    await time.increaseTo(unlockTime);
    await lock.withdraw();
  });

  it("Should revert with the right error if called from another account", async function () {
    const { lock, unlockTime } = await loadFixture(deployOneYearLockFixture);
    const [owner, otherAccount] = await hre.ethers.getSigners();

    await time.increaseTo(unlockTime);

    await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
      "You aren't the owner"
    );
  });
});
