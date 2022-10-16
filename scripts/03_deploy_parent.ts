import { ethers } from "hardhat";

async function main() {
  const Parent = await ethers.getContractFactory("Parent");
  const parent = await Parent.deploy(process.env.XEN || "");

  await parent.deployed();
  console.log(`Parent deployed to ${parent.address}`);

  const action = await parent.directMint();

  const tx = await action.wait();
  console.log(`mint hash to ${tx.transactionHash}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
