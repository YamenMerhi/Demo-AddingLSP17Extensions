import { ethers } from 'hardhat';
import * as dotenv from 'dotenv';
import { abi as UP_ABI } from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';

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

    const abi = ["function buyMeACoffee()"];
    UP = new ethers.Contract(UP_ADDR as string, abi, provider);


    const valueToSend = 7;

    const tx = await UP.connect(signer).buyMeACoffee({ value: valueToSend });
    await tx.wait();

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });