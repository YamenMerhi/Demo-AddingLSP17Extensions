import { ethers } from 'hardhat';
import * as dotenv from 'dotenv';
import { abi as UP_ABI } from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';

import { SupportsInterface__factory } from '../typechain-types';
import { ERC725YDataKeys } from '@lukso/lsp-smart-contracts';

// load env vars
dotenv.config();

// Update those values in the .env file
const { UP_ADDR, PRIVATE_KEY } = process.env;

async function main() {

    // setup provider
    const provider = new ethers.JsonRpcProvider('https://rpc.testnet.lukso.network');
    // setup signer (the browser extension controller)
    const signer = new ethers.Wallet(PRIVATE_KEY as string, provider);

    let UP = new ethers.Contract(UP_ADDR as string, UP_ABI, provider);

    console.log('🔑 EOA: ', signer.address);
    console.log('🆙 Universal Profile: ', await UP.getAddress());

    // The contract to deploy which have the function supportsInterface that supports
    // the new interfaceId that the UniversalProfile needs to support
    const supportsInterfaceExtension = await new SupportsInterface__factory(signer).deploy();
    console.log("The address of the  extension", supportsInterfaceExtension.target);


    const supportsInterfaceSelector = ethers.id("supportsInterface(bytes4)").substring(0, 10);
    const constructedDataKey = ERC725YDataKeys.LSP17.LSP17ExtensionPrefix + ethers.zeroPadBytes(supportsInterfaceSelector, 20).substring(2);

    const tx = await UP.connect(signer).setData(constructedDataKey, supportsInterfaceExtension.target);
    await tx.wait();
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });