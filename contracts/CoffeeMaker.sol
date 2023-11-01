// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import {LSP17Extension} from "@lukso/lsp-smart-contracts/contracts/LSP17ContractExtension/LSP17Extension.sol";

contract CoffeeMaker is LSP17Extension {
    uint256 public coffeeRevenue;

    function buyMeACoffee() public {
        coffeeRevenue += _extendableMsgValue();
    }
}
