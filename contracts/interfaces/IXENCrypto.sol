// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

interface IXENCrypto {
    function claimRank(uint256 term) external;
    function claimMintReward() external;
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `to`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address to, uint256 amount) external returns (bool);
}
