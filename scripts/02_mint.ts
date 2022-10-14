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
  // const [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

  // We get the contract to deploy
  const XEN = await ethers.getContractFactory("XENCrypto");
  const xen = await XEN.attach(process.env.XEN || "");

  let action = await xen.claimRank(1);

  let tx = await action.wait();
  console.log(
    `You did it! View your tx here: ${ETHERSCAN_TX_URL}${tx.transactionHash}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
