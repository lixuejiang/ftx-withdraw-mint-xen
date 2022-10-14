// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { run, ethers } from "hardhat";

const ETHERSCAN_TX_URL = "https://goerli.etherscan.io/tx/";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  const [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

  // We get the contract to deploy
  const Parent = await ethers.getContractFactory("Parent");
  const parent = await Parent.attach(process.env.PARENT || "");

  let data = await owner.sendTransaction({
    to: process.env.PARENT,
    value: 0,
    gasLimit: ethers.BigNumber.from("2100000"),
  });

  console.log(data);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
