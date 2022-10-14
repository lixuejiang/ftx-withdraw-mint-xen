// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

abstract contract IChildren  {
    function mint() external virtual;
    function claim() external virtual;
}
