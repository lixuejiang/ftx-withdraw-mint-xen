import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Xen", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {
    const Xen = await ethers.getContractFactory("XENCrypto");
    const xen = await Xen.deploy();

    await xen.deployed();
    const { address } = xen;

    const Parent = await ethers.getContractFactory("Parent");
    const parent = await Parent.deploy(address);
    await parent.deployed();

    return { xen, parent };
  }

  describe("Deployment", function () {
    it("Should has 0 children", async function () {
      const { xen, parent } = await loadFixture(deployOneYearLockFixture);
      console.log("parent address", parent.address);
      expect(parent.address.length).to.gt(0);
    });
  });

  describe("sender", function () {
    it("Should has 1 time", async function () {
      const { xen, parent } = await loadFixture(deployOneYearLockFixture);
      const [owner] = await ethers.getSigners();
      const result = await owner.sendTransaction({
        to: parent.address,
        value: ethers.utils.parseEther("0.001"),
        gasLimit: 21000000,
      });
      // console.log(result);
      const times = (await parent.times()).toNumber();
      console.log(`times is ${times}`);
      expect(times).to.equal(1);
    });
    it("Should has ten address", async function () {
      const { xen, parent } = await loadFixture(deployOneYearLockFixture);
      const [owner] = await ethers.getSigners();
      const result = await owner.sendTransaction({
        to: parent.address,
        value: ethers.utils.parseEther("0.001"),
        gasLimit: 21000000,
      });
      // console.log(result);
      const times = (await parent.times()).toNumber();
      console.log(`times is ${times}`);
      expect(times).to.equal(1);
      for (let index = 0; index < 10; index++) {
        const address = await parent.calculateAddr(0, index);
        console.log("address", address);
        expect(address.length).to.gt(0);
      }
    });
  });

  describe("claim", function () {
    it("Should with draw success", async function () {
      const { xen, parent } = await loadFixture(deployOneYearLockFixture);
      const [owner] = await ethers.getSigners();
      const result = await owner.sendTransaction({
        to: parent.address,
        value: ethers.utils.parseEther("0.001"),
        gasLimit: 21000000,
      });

      await ethers.provider.send("evm_increaseTime", [24 * 3600 + 1]);

      // console.log(result);
      const claim = await owner.sendTransaction({
        to: parent.address,
        value: ethers.utils.parseEther("0.0005"),
        gasLimit: 21000000,
      });
      // const length = (await parent.getChildrenLength()).toNumber();
      // console.log(`length is ${length}`);
      // expect(length).to.equal(0);

      let balance = await xen.balanceOf(
        "0x3e7Ff0602B6DbcD554c836bAf7e6fC64D2a665d0"
      );

      balance = balance.div(ethers.BigNumber.from(10).pow(18));
      console.log(balance.toString());
      expect(balance.toNumber()).to.gt(0);
    });
  });

  // describe("Withdrawals", function () {
  //   describe("Validations", function () {
  //     it("Should revert with the right error if called too soon", async function () {
  //       const { lock } = await loadFixture(deployOneYearLockFixture);

  //       await expect(lock.withdraw()).to.be.revertedWith(
  //         "You can't withdraw yet"
  //       );
  //     });

  //     it("Should revert with the right error if called from another account", async function () {
  //       const { lock, unlockTime, otherAccount } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       // We can increase the time in Hardhat Network
  //       await time.increaseTo(unlockTime);

  //       // We use lock.connect() to send a transaction from another account
  //       await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
  //         "You aren't the owner"
  //       );
  //     });

  //     it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
  //       const { lock, unlockTime } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       // Transactions are sent using the first signer by default
  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw()).not.to.be.reverted;
  //     });
  //   });

  //   describe("Events", function () {
  //     it("Should emit an event on withdrawals", async function () {
  //       const { lock, unlockTime, lockedAmount } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw())
  //         .to.emit(lock, "Withdrawal")
  //         .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
  //     });
  //   });

  //   describe("Transfers", function () {
  //     it("Should transfer the funds to the owner", async function () {
  //       const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
  //         deployOneYearLockFixture
  //       );

  //       await time.increaseTo(unlockTime);

  //       await expect(lock.withdraw()).to.changeEtherBalances(
  //         [owner, lock],
  //         [lockedAmount, -lockedAmount]
  //       );
  //     });
  //   });
  // });
});
