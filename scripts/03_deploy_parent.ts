import { ethers } from "hardhat";

async function main() {
  const Lock = await ethers.getContractFactory("Parent");
  const lock = await Lock.deploy(process.env.XEN || "");

  await lock.deployed();
  console.log(`Parent deployed to ${lock.address}`);

  const action = await lock.directMint();

  const tx = await action.wait();
  console.log(`mint hash to ${tx.transactionHash}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
