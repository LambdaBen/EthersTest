import { ethers } from "ethers";
import dotenv from "dotenv";
import { bytecode } from "./data/erc20bytecode";
import { erc20abi } from "./data/erc20abi";
dotenv.config({ path: "../../.env" });

const nodit = process.env.NODIT_SEPOLIA_RPC_URL;
const alchemy = process.env.ALCHEMY_SEPOLIA_RPC_URL;
const infura = process.env.INFURA_SEPOLIA_RPC_URL;
const quicknode = process.env.QUICKNODE_SEPOLIA_RPC_URL;

const provider = new ethers.providers.JsonRpcProvider(alchemy);

async function callContract(): Promise<any> {
  try {
    const privateKey = process.env.PRIVATE_KEY;
    const testPrivateKey = process.env.TEST_PRIVATE_KEY;

    if (!privateKey || !testPrivateKey) {
      throw Error();
    }

    const signer = new ethers.Wallet(privateKey, provider);
    const contractAddress = "0xF47dD282DF9a4D8881894bC5fD706640ec6e5CDb";

    const testAddress = "0xBf54dDe15F8eD8ee20e96775C4A3Bb1dDe7fAbc4";
    const amount = ethers.utils.hexlify(10000);
    const transferFunction = "transfer(address,uint256)";

    // function getSignature(signature: string): string {
    //   const getSig = ethers.utils.keccak256(signature).slice(0, 10);
    //   return getSig;
    // }

    // function zeroPad(hexText: string): string {
    //   const slice0x = hexText.slice(2);
    //   const zeroPadValue = slice0x.padStart(64, "0");
    //   return zeroPadValue;
    // }
    // const transferRawTx = {
    //   from: signer.address,
    //   to: contractAddress,
    //   nonce: await provider.getTransactionCount(signer.address),
    //   data:
    //     getSignature(transferFunction) + zeroPad(testAddress) + zeroPad(amount),
    // };

    const contract = new ethers.Contract(contractAddress, erc20abi, signer);
    const tx = await contract.transfer(testAddress, 1000);
    console.log(tx);
  } catch (err) {
    console.error(err);
  }
}

callContract();
