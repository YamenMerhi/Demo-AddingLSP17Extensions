// Coffee Maker extension 0x77D4195988Ebd257c0F7Bfc50715A1FCe3eDCA6a

import { ethers } from 'hardhat';
import * as dotenv from 'dotenv';

// load env vars
dotenv.config();

// Update those values in the .env file
const { PRIVATE_KEY } = process.env;

async function main() {

    // setup provider
    const provider = new ethers.JsonRpcProvider('https://rpc.testnet.lukso.network');
    // setup signer (the browser extension controller)
    const signer = new ethers.Wallet(PRIVATE_KEY as string, provider);


    const abi = ["function coffeeRevenue() returns (uint256)"];

    // Insert the extension address here
    const extensionAddress = "0x...."

    let extension = new ethers.Contract(extensionAddress, abi, provider);

    const result = await extension.connect(signer).coffeeRevenue.staticCall();
    console.log(result);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });