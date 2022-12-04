export const verifiedContractData = {
  creatorAddress: "0x35gh7u94x47u89h3540x34gh7u94x47u89h3540",
  balance: {
    value: 1200231.0003291,
    symbol: "DFI",
  },
  transaction: 376253298,
  networth: 276.392837,
  dmctxBalance: {
    dollarValue: 4593,
    value: 6283.982739,
  },
  otherTokens: {
    value: 120.33,
    allTokens: [
      {
        value: 287361,
        symbol: "DFI",
      },
      {
        value: 287361,
        symbol: "dBCH",
      },
      {
        value: 287361,
        symbol: "BTC",
      },
      {
        value: 7361,
        symbol: "dDFI",
      },
      {
        value: 287361,
        symbol: "dUSD",
      },
      {
        value: 287361,
        symbol: "dLTC",
      },
      {
        value: 361,
        symbol: "USDT",
      },
    ],
  },
  contractName: "TransparentUpgradeableProxy",
  compilerVersion: "v0.8.2+commit.661d1103",
  evmVersion: "default",
  optimizationEnabled: true,
  optimazationRuns: 200,
  verifiedAt: "2022-09-18T23:23:29.350335Z",
  codes: [
    {
      fileName: "ERC721Creator.sol",
      code: `
            // SPDX-License-Identifier: MIT

            pragma solidity ^0.8.0;

            /// @author: manifold.xyz

            import "@openzeppelin/contracts/proxy/Proxy.sol";
            import "@openzeppelin/contracts/utils/Address.sol";
            import "@openzeppelin/contracts/utils/StorageSlot.sol";

            contract ERC721Creator is Proxy {
            
            constructor(string memory name, string memory symbol) {
                assert(_IMPLEMENTATION_SLOT == bytes32(uint256(keccak256("eip1967.proxy.implementation")) - 1));
                StorageSlot.getAddressSlot(_IMPLEMENTATION_SLOT).value = 0xe4E4003afE3765Aca8149a82fc064C0b125B9e5a;
                Address.functionDelegateCall(
                    0xe4E4003afE3765Aca8149a82fc064C0b125B9e5a,
                    abi.encodeWithSignature("initialize(string,string)", name, symbol)
                );
            }
                
            /**
             * @dev Storage slot with the address of the current implementation.
             * This is the keccak-256 hash of "eip1967.proxy.implementation" subtracted by 1, and is
             * validated in the constructor.
             */
            bytes32 internal constant _IMPLEMENTATION_SLOT = 0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc;

            /**
             * @dev Returns the current implementation address.
             */
            function implementation() public view returns (address) {
                return _implementation();
            }

            function _implementation() internal override view returns (address) {
                return StorageSlot.getAddressSlot(_IMPLEMENTATION_SLOT).value;
            }    
        }`,
    },
    {
      fileName: "ERC432.sol",
      code: `/**
            *Submitted for verification at cronoscan.com on 2022-02-20
            */
                
            /**
            *Submitted for verification at FtmScan.com on 2021-09-12
            */

            // SPDX-License-Identifier: MIT

            pragma solidity ^0.8.0;


            /**
            * @dev This abstract contract provides a fallback function that delegates all calls to another contract using the EVM
            * instruction \`delegatecall\`. We refer to the second contract as the _implementation_ behind the proxy, and it has to
            * be specified by overriding the virtual {_implementation} function.
            *
            * Additionally, delegation to the implementation can be triggered manually through the {_fallback} function, or to a
            * different contract through the {_delegate} function.
            *
            * The success and return data of the delegated call will be returned back to the caller of the proxy.
            */
            abstract contract Proxy {
            /**
            * @dev Delegates the current call to \`implementation\`.
            *
            * This function does not return to its internall call site, it will return directly to the external caller.
            */
            function _delegate(address implementation) internal virtual {
                // solhint-disable-next-line no-inline-assembly
                assembly {
                    // Copy msg.data. We take full control of memory in this inline assembly
                    // block because it will not return to Solidity code. We overwrite the
                    // Solidity scratch pad at memory position 0.
                    calldatacopy(0, 0, calldatasize())

                    // Call the implementation.
                    // out and outsize are 0 because we don't know the size yet.
                    let result := delegatecall(gas(), implementation, 0, calldatasize(), 0, 0)

                    // Copy the returned data.
                    returndatacopy(0, 0, returndatasize())

                    switch result
                    // delegatecall returns 0 on error.
                    case 0 { revert(0, returndatasize()) }
                    default { return(0, returndatasize()) }
                }
            }
                
                /**
                * @dev This is a virtual function that should be overriden so it returns the address to which the fallback function
                * and {_fallback} should delegate.
                */
                function _implementation() internal view virtual returns (address);

                /**
                * @dev Delegates the current call to the address returned by \`_implementation()\`.
                *
                * This function does not return to its internall call site, it will return directly to the external caller.
                */
                function _fallback() internal virtual {
                    _beforeFallback();
                    _delegate(_implementation());
                }

                /**
                * @dev Fallback function that delegates calls to the address returned by \`_implementation()\`. Will run if no other
                * function in the contract matches the call data.
                */
                fallback () external payable virtual {
                    _fallback();
                }

                /**
                * @dev Fallback function that delegates calls to the address returned by \`_implementation()\`. Will run if call data
                * is empty.
                */
                receive () external payable virtual {
                    _fallback();
                }

                /**
                * @dev Hook that is called before falling back to the implementation. Can happen as part of a manual \`_fallback\`
                * call, or as part of the Solidity \`fallback\` or \`receive\` functions.
                *
                * If overriden should call \`super._beforeFallback()\`.
                */
                function _beforeFallback() internal virtual {
                }
            }

            /**
            * @dev This abstract contract provides getters and event emitting update functions for
            * https://eips.ethereum.org/EIPS/eip-1967[EIP1967] slots.
            *
            * _Available since v4.1._
            *
            * @custom:oz-upgrades-unsafe-allow delegatecall
            */
            abstract contract ERC1967Upgrade {
                // This is the keccak-256 hash of "eip1967.proxy.rollback" subtracted by 1
                bytes32 private constant _ROLLBACK_SLOT = 0x4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd9143;

                /**
                * @dev Storage slot with the address of the current implementation.
                * This is the keccak-256 hash of "eip1967.proxy.implementation" subtracted by 1, and is
                * validated in the constructor.
                */
                bytes32 internal constant _IMPLEMENTATION_SLOT = 0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc;

                /**
                * @dev Emitted when the implementation is upgraded.
                */
                event Upgraded(address indexed implementation);

                /**
                * @dev Returns the current implementation address.
                */
                function _getImplementation() internal view returns (address) {
                    return StorageSlot.getAddressSlot(_IMPLEMENTATION_SLOT).value;
                }

                /**
                * @dev Stores a new address in the EIP1967 implementation slot.
                */
                function _setImplementation(address newImplementation) private {
                    require(Address.isContract(newImplementation), "ERC1967: new implementation is not a contract");
                    StorageSlot.getAddressSlot(_IMPLEMENTATION_SLOT).value = newImplementation;
                }

                /**
                * @dev Perform implementation upgrade
                *
                * Emits an {Upgraded} event.
                */
                function _upgradeTo(address newImplementation) internal {
                    _setImplementation(newImplementation);
                    emit Upgraded(newImplementation);
                }

                /**
                * @dev Perform implementation upgrade with additional setup call.
                *
                * Emits an {Upgraded} event.
                */
                function _upgradeToAndCall(address newImplementation, bytes memory data, bool forceCall) internal {
                    _setImplementation(newImplementation);
                    emit Upgraded(newImplementation);
                    if (data.length > 0 || forceCall) {
                        Address.functionDelegateCall(newImplementation, data);
                    }
                }

                /**
                * @dev Perform implementation upgrade with security checks for UUPS proxies, and additional setup call.
                *
                * Emits an {Upgraded} event.
                */
                function _upgradeToAndCallSecure(address newImplementation, bytes memory data, bool forceCall) internal {
                    address oldImplementation = _getImplementation();

                    // Initial upgrade and setup call
                    _setImplementation(newImplementation);
                    if (data.length > 0 || forceCall) {
                        Address.functionDelegateCall(newImplementation, data);
                    }

                    // Perform rollback test if not already in progress
                    StorageSlot.BooleanSlot storage rollbackTesting = StorageSlot.getBooleanSlot(_ROLLBACK_SLOT);
                    if (!rollbackTesting.value) {
                        // Trigger rollback using upgradeTo from the new implementation
                        rollbackTesting.value = true;
                        Address.functionDelegateCall(
                            newImplementation,
                            abi.encodeWithSignature(
                                "upgradeTo(address)",
                                oldImplementation
                            )
                        );
                        rollbackTesting.value = false;
                        // Check rollback was effective
                        require(oldImplementation == _getImplementation(), "ERC1967Upgrade: upgrade breaks further upgrades");
                        // Finally reset to the new implementation and log the upgrade
                        _setImplementation(newImplementation);
                        emit Upgraded(newImplementation);
                    }
                }

                /**
                * @dev Perform beacon upgrade with additional setup call. Note: This upgrades the address of the beacon, it does
                * not upgrade the implementation contained in the beacon (see {UpgradeableBeacon-_setImplementation} for that).
                *
                * Emits a {BeaconUpgraded} event.
                */
                function _upgradeBeaconToAndCall(address newBeacon, bytes memory data, bool forceCall) internal {
                    _setBeacon(newBeacon);
                    emit BeaconUpgraded(newBeacon);
                    if (data.length > 0 || forceCall) {
                        Address.functionDelegateCall(IBeacon(newBeacon).implementation(), data);
                    }
                }

                /**
                * @dev Storage slot with the admin of the contract.
                * This is the keccak-256 hash of "eip1967.proxy.admin" subtracted by 1, and is
                * validated in the constructor.
                */
                bytes32 internal constant _ADMIN_SLOT = 0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103;

                /**
                * @dev Emitted when the admin account has changed.
                */
                event AdminChanged(address previousAdmin, address newAdmin);

                /**
                * @dev Returns the current admin.
                */
                function _getAdmin() internal view returns (address) {
                    return StorageSlot.getAddressSlot(_ADMIN_SLOT).value;
                }

                /**
                * @dev Stores a new address in the EIP1967 admin slot.
                */
                function _setAdmin(address newAdmin) private {
                    require(newAdmin != address(0), "ERC1967: new admin is the zero address");
                    StorageSlot.getAddressSlot(_ADMIN_SLOT).value = newAdmin;
                }

                /**
                * @dev Changes the admin of the proxy.
                *
                * Emits an {AdminChanged} event.
                */
                function _changeAdmin(address newAdmin) internal {
                    emit AdminChanged(_getAdmin(), newAdmin);
                    _setAdmin(newAdmin);
                }

                /**
                * @dev The storage slot of the UpgradeableBeacon contract which defines the implementation for this proxy.
                * This is bytes32(uint256(keccak256('eip1967.proxy.beacon')) - 1)) and is validated in the constructor.
                */
                bytes32 internal constant _BEACON_SLOT = 0xa3f0ad74e5423aebfd80d3ef4346578335a9a72aeaee59ff6cb3582b35133d50;

                /**
                * @dev Emitted when the beacon is upgraded.
                */
                event BeaconUpgraded(address indexed beacon);

                /**
                * @dev Returns the current beacon.
                */
                function _getBeacon() internal view returns (address) {
                    return StorageSlot.getAddressSlot(_BEACON_SLOT).value;
                }

                /**
                * @dev Stores a new beacon in the EIP1967 beacon slot.
                */
                function _setBeacon(address newBeacon) private {
                    require(
                        Address.isContract(newBeacon),
                        "ERC1967: new beacon is not a contract"
                    );
                    require(
                        Address.isContract(IBeacon(newBeacon).implementation()),
                        "ERC1967: beacon implementation is not a contract"
                    );
                    StorageSlot.getAddressSlot(_BEACON_SLOT).value = newBeacon;
                }
            }
            `,
    },
    {
      fileName: "Proxy.sol",
      code: `// SPDX-License-Identifier: MIT
            // OpenZeppelin Contracts (last updated v4.6.0) (proxy/Proxy.sol)

            pragma solidity ^0.8.0;

            /**
             * @dev This abstract contract provides a fallback function that delegates all calls to another contract using the EVM
             * instruction \`delegatecall\`. We refer to the second contract as the _implementation_ behind the proxy, and it has to
             * be specified by overriding the virtual {_implementation} function.
             *
             * Additionally, delegation to the implementation can be triggered manually through the {_fallback} function, or to a
             * different contract through the {_delegate} function.
             *
             * The success and return data of the delegated call will be returned back to the caller of the proxy.
             */
            abstract contract Proxy {
                /**
                 * @dev Delegates the current call to \`implementation\`.
                 *
                 * This function does not return to its internal call site, it will return directly to the external caller.
                 */
                function _delegate(address implementation) internal virtual {
                    assembly {
                        // Copy msg.data. We take full control of memory in this inline assembly
                        // block because it will not return to Solidity code. We overwrite the
                        // Solidity scratch pad at memory position 0.
                        calldatacopy(0, 0, calldatasize())

                        // Call the implementation.
                        // out and outsize are 0 because we don't know the size yet.
                        let result := delegatecall(gas(), implementation, 0, calldatasize(), 0, 0)

                        // Copy the returned data.
                        returndatacopy(0, 0, returndatasize())

                        switch result
                        // delegatecall returns 0 on error.
                        case 0 {
                            revert(0, returndatasize())
                        }
                        default {
                            return(0, returndatasize())
                        }
                    }
                }

                /**
                 * @dev This is a virtual function that should be overridden so it returns the address to which the fallback function
                 * and {_fallback} should delegate.
                 */
                function _implementation() internal view virtual returns (address);

                /**
                 * @dev Delegates the current call to the address returned by \`_implementation()\`.
                 *
                 * This function does not return to its internal call site, it will return directly to the external caller.
                 */
                function _fallback() internal virtual {
                    _beforeFallback();
                    _delegate(_implementation());
                }

                /**
                 * @dev Fallback function that delegates calls to the address returned by \`_implementation()\`. Will run if no other
                 * function in the contract matches the call data.
                 */
                fallback() external payable virtual {
                    _fallback();
                }

                /**
                 * @dev Fallback function that delegates calls to the address returned by \`_implementation()\`. Will run if call data
                 * is empty.
                 */
                receive() external payable virtual {
                    _fallback();
                }

                /**
                 * @dev Hook that is called before falling back to the implementation. Can happen as part of a manual \`_fallback\`
                 * call, or as part of the Solidity \`fallback\` or \`receive\` functions.
                 *
                 * If overridden should call \`super._beforeFallback()\`.
                 */
                function _beforeFallback() internal virtual {}
            }`,
    },
  ],
  writeContractData: [
    {
      parentid: 1,
      title: "1. grantRole (9x345)",
      summary:
        "Grants `role` to `account`. If `account` had not been already granted `role`, emits a {RoleGranted} event. Requirements: - the caller must have ``role``'s admin role.",
      inputs: [
        {
          id: "a1",
          title: "account (address)",
        },
        {
          id: "a2",
          title: "_multiSigWallet (address)",
        },
      ],
    },
    {
      parentid: 2,
      title: "2. initialize (9x345)",
      summary:
        "Revokes `role` from the calling account. Roles are often managed via {grantRole} and {revokeRole}: this function's purpose is to provide a mechanism for accounts to lose their privileges if they are compromised (such as when a trusted device is misplaced). If the calling account had been revoked `role`, emits a {RoleRevoked} event. Requirements: - the caller must be `account`.",
      inputs: [
        {
          id: "b1",
          title: "_multiSigWallet (address)",
        },
        {
          id: "b2",
          title: "_referenceFeedAddress (address)",
        },
      ],
    },
    {
      parentid: 3,
      title: "3. renounceRole (9x345)",
      summary:
        "Grants `role` to `account`. If `account` had not been already granted `role`, emits a {RoleGranted} event. Requirements: - the caller must have ``role``'s admin role.",
      inputs: [
        {
          id: "c1",
          title: "recipient (address)",
          userInputValue: "",
        },
        {
          id: "c2",
          title: "amount (uint256)",
        },
      ],
    },
    {
      parentid: 4,
      title: "4. revokeRole (x0234sd)",
      summary:
        "Revokes `role` from `account`. If `account` had been granted `role`, emits a {RoleRevoked} event. Requirements: - the caller must have ``role``'s admin role.",
      inputs: [
        {
          id: "d1",
          title: "recipient (address)",
        },
        {
          id: "d2",
          title: "sender (address)",
        },
      ],
    },
  ],
};

export const readContractPages = [
  {
    n: 1,
    active: true,
    cursors: [],
  },
  {
    n: 2,
    active: false,
    cursors: ["1"],
  },
  {
    n: 3,
    active: false,
    cursors: ["1", "2"],
  },
];
