import { ethers } from "ethers";
import dotenv from "dotenv";
import { bytecode } from "./data/erc20bytecode";
dotenv.config({ path: "../../.env" });

const privateKey = process.env.PRIVATE_KEY;
const nodit = process.env.NODIT_SEPOLIA_RPC_URL;
const alchemy = process.env.ALCHEMY_SEPOLIA_RPC_URL;
const infura = process.env.INFURA_SEPOLIA_RPC_URL;
const quicknode = process.env.QUICKNODE_SEPOLIA_RPC_URL;

const provider = new ethers.JsonRpcProvider(nodit);

if (!privateKey) {
  throw Error("Private Key X");
}

const signer = new ethers.Wallet(privateKey, provider);
async function deploy() {
  const getGas = {
    from: signer.address,
    data: `0x${bytecode}`,
  };
  console.log(signer.address);
  const gas = await provider.estimateGas(getGas);

  const tx = {
    nonce: await provider.getTransactionCount(signer.address),
    gasPrice: 2000000000,
    gasLimit: gas,
    data: `0x${bytecode}`,
    chainId: 11155111,
  };

  const signedTx = await signer.signTransaction(tx);

  try {
    // await delay(500);
    let count = 0;
    const sendTx = await provider.broadcastTransaction(signedTx);
    console.log("Transaction hash:", sendTx.hash);
    const receipt = await sendTx.wait();
    if (!receipt) {
      throw Error();
    }
    console.log("Contract deployed at address:", receipt.contractAddress);
    count++;
    console.log(count);
  } catch (err) {
    throw err;
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function multicall(ms: number) {
  for (let i = 0; i < 10; i++) {
    try {
      const result = await deploy();
      console.log(result);
      // await delay(ms);
    } catch (err) {
      console.error(err);
    }
  }
}

multicall(500);

// deploy();
