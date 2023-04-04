// SPDX-License-Identifier: CAL
pragma solidity =0.8.18;

import "../../orderbook/IOrderBookV1.sol";
import {IERC20Upgradeable as IERC20} from "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";
import {SafeERC20Upgradeable as SafeERC20} from "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "hardhat/console.sol";

/// @title OBMultiTx
/// A test contract that intend to make multi calls to an specifc OB Interface
/// to make specific test on the OB Subgraph.
contract OBMultiTx {
    using SafeERC20 for IERC20;

    IOrderBookV1 public immutable OBContract;

    constructor(IOrderBookV1 OBContract_) {
        OBContract = OBContract_;
    }

    function multiDeposit(DepositConfig[] calldata configs_) external {
        for (uint256 i_ = 0; i_ < configs_.length; i_++) {
            DepositConfig calldata config_ = configs_[i_];
            IERC20(config_.token).safeTransferFrom(
                msg.sender,
                address(this),
                config_.amount
            );

            IERC20(config_.token).safeApprove(
                address(OBContract),
                config_.amount
            );
            OBContract.deposit(config_);
        }
    }

    /// This Withdraw does not return the funds to the sender.
    function multiWithdraw(WithdrawConfig[] calldata configs_) external {
        for (uint256 i_ = 0; i_ < configs_.length; i_++) {
            WithdrawConfig calldata config_ = configs_[i_];
            OBContract.withdraw(config_);
        }
    }

    function multiAddOrder(OrderConfig[] calldata configs_) external {
        for (uint256 i_ = 0; i_ < configs_.length; i_++) {
            OBContract.addOrder(configs_[i_]);
        }
    }
}
