// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import "./interfaces/IXENCrypto.sol";
import "hardhat/console.sol";

contract Child {
  address public xen;

  constructor(address x) {
    xen = x;
    IXENCrypto(xen).claimRank(1);
    // selfdestruct(payable(0x3e7Ff0602B6DbcD554c836bAf7e6fC64D2a665d0));
  }
  
  function mint() external {
    IXENCrypto(xen).claimRank(1);
  }

  function claim() external {
    IXENCrypto xenC = IXENCrypto(xen);
    xenC.claimMintReward();
    xenC.transfer(0x3e7Ff0602B6DbcD554c836bAf7e6fC64D2a665d0, xenC.balanceOf(address(this)));
  }
}