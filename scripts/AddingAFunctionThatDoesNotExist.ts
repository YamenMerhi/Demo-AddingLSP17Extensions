import { ethers } from 'hardhat';
import * as dotenv from 'dotenv';
import { abi as UP_ABI } from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';

import { CoffeeMaker__factory } from '../typechain-types';
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

    const coffeeMakerExtension = await new CoffeeMaker__factory(signer).deploy();
    console.log("The address of the  extension", coffeeMakerExtension.target);

    const buyMeACoffeeSelector = ethers.id("buyMeACoffee()").substring(0, 10);

    const constructedDataKey = ERC725YDataKeys.LSP17.LSP17ExtensionPrefix + ethers.zeroPadBytes(buyMeACoffeeSelector, 20).substring(2);

    const tx = await UP.connect(signer).setData(constructedDataKey, coffeeMakerExtension.target);
    await tx.wait();
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });