// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import "./Children.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "hardhat/console.sol";

contract Parent is ReentrancyGuard, Ownable {
  Children[] children;
  address public xen;

  constructor(address x) {
    xen = x;
    Children child = new Children(xen);
    child.mint();
    children.push(child);
  }

  function getChildrenLength() public view returns (uint256) {
    return children.length;
  }

  function getChildrenAtIndex(uint256 index) public view returns (address) {
    return address(children[index]);
  }

  receive() external payable {
    console.log("msg.vale %s",msg.value);
    if (msg.value == 0.001 ether) {
      for (uint256 index = 0; index < 10; index++) {
        Children child = new Children(xen);
        child.mint();
        children.push(child);
      }
    } else {
      for (uint256 index = 0; index < children.length; index++) {
        children[index].claim();
        // address payable addr = payable(address(children[index]));
        // selfdestruct(addr);
        delete children[index];
      }
    }
    
  }

  fallback() external payable {
    console.log("fallback");
  }

  function directMint() external {
    Children child = new Children(xen);
    child.mint();
    children.push(child);
  }

  function withdraw() external onlyOwner {
    address thisAdd = address(this);
    address to = _msgSender();
    uint256 balance0 = thisAdd.balance;
    require(0 <= balance0, "IXO: INSUFFICIENT_AMOUNT");
    payable(to).transfer(balance0);
  }
}