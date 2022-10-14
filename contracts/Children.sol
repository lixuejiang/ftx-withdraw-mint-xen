// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import "./interfaces/IXENCrypto.sol";
import "hardhat/console.sol";


contract Children {
  address public xen;
  IXENCrypto xenC;

  event Mint(address from, address to);
  event Claim(address from, address to);

  constructor(address x) {
    xen = x;
    xenC = IXENCrypto(xen);
  }
  
  function mint() external {
    xenC.claimRank(1);
    emit Mint(msg.sender, address(this));
  }

  function claim() external {
    xenC.claimMintReward();
    xenC.transfer(0x3e7Ff0602B6DbcD554c836bAf7e6fC64D2a665d0, xenC.balanceOf(address(this)));
    emit Claim(msg.sender, address(this));
  }
}