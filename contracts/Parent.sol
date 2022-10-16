// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;
import "./Child.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "hardhat/console.sol";

contract Parent is ReentrancyGuard, Ownable {
    address public xen;
    uint256 public times = 0;

    constructor(address x) {
        xen = x;
    }

    function setTimes(uint256 t) external {
        times = t;
    }

    function getBytecode(address x) public pure returns (bytes memory) {
        bytes memory bytecode = type(Child).creationCode;
        return abi.encodePacked(bytecode, abi.encode(x));
    }

    // 提前计算pair合约地址
    function calculateAddr(uint256 t, uint256 index)
        public
        view
        returns (address predictedAddress)
    {
        // 计算用tokenA和tokenB地址计算salt
        console.log("calculateAddr times is %s, index is %s", t, index);
        bytes32 salt = keccak256(abi.encodePacked(t, index));
        // 计算合约地址方法 hash()
        predictedAddress = address(
            uint160(
                uint256(
                    keccak256(
                        abi.encodePacked(
                            bytes1(0xff),
                            address(this),
                            salt,
                            keccak256(getBytecode(xen))
                        )
                    )
                )
            )
        );
    }

    // function deploy(
    //     bytes memory bytecode,
    //     uint256 t,
    //     uint256 index
    // ) public returns (address predictedAddress) {
    //     bytes32 salt = keccak256(abi.encodePacked(t, index));
    //     assembly {
    //         let codeSize := mload(bytecode) // get size of init_bytecode
    //         predictedAddress := create2(
    //             0, // 0 wei
    //             add(bytecode, 32), // the bytecode itself starts at the second slot. The first slot contains array length
    //             codeSize, // size of init_code
    //             salt // salt from function arguments
    //         )
    //         if iszero(extcodesize(predictedAddress)) {
    //             revert(0, 0)
    //         }
    //     }
    // }

    function claim(uint256 t) public {
        for (uint256 index = 0; index < 10; index++) {
            console.log("claim times %s", t);
            address childAdd = calculateAddr(t, index);
            console.log("address is %s, index is %s", childAdd, index);
            Child(childAdd).claim();
        }
    }

    receive() external payable {
        console.log("msg.vale %s", msg.value);
        if (msg.value == 0.001 ether) {
            for (uint256 index = 0; index < 10; index++) {
                bytes32 salt = keccak256(abi.encodePacked(times, index));
                new Child{salt: salt}(xen);
            }
            times++;
        } else {
            claim(times - 1);
        }
    }

    fallback() external payable {
        console.log("fallback");
    }

    function directMint() external {
        bytes32 salt = keccak256(abi.encodePacked(times, uint256(0)));
        new Child{salt: salt}(xen);
        // address child = deploy(getBytecode(xen), times, uint256(0));
        // child.mint();
        // console.log(address(child));
        times++;
    }

    function withdraw() external onlyOwner {
        address thisAdd = address(this);
        address to = _msgSender();
        uint256 balance0 = thisAdd.balance;
        require(0 <= balance0, "IXO: INSUFFICIENT_AMOUNT");
        payable(to).transfer(balance0);
    }
}
