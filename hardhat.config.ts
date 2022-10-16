import { HardhatUserConfig } from "hardhat/config";
import { config as dotEnvConfig } from "dotenv";
import "@nomicfoundation/hardhat-toolbox";
dotEnvConfig();

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const config: HardhatUserConfig = {
  solidity: "0.8.17",
  defaultNetwork: "mainnet",
  networks: {
    hardhat: {},
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/2ee61fcf1162409f8ad088cd4b57e991",
      accounts: [PRIVATE_KEY || ""],
    },
    bsc: {
      url: "https://bsc-mainnet.web3api.com/v1/MAPC21XTQT2MWHDBHG34HZYW4T7IE2CAQR",
      accounts: [PRIVATE_KEY || ""],
    },
    goerli: {
      url: "https://goerli.infura.io/v3/2ee61fcf1162409f8ad088cd4b57e991",
      accounts: [PRIVATE_KEY || ""],
    },
    mainnet: {
      url: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      accounts: [PRIVATE_KEY || ""],
    },
  },
};

export default config;
