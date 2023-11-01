// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract SupportsInterface {
    function supportsInterface(bytes4 interfaceId) public pure returns (bool) {
        return interfaceId == 0xaabbccdd;
    }
}
