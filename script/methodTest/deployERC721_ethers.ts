import { ethers } from "ethers";
import dotenv from "dotenv";
import { bytecode } from "./data/erc721bytecode";
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

  const gas = await provider.estimateGas(getGas);

  const tx = {
    nonce: await provider.getTransactionCount(signer.address),
    gasPrice: 99464622,
    gasLimit: gas,
    data: `0x${bytecode}`,
    chainId: 11155111,
  };

  const signedTx = await signer.signTransaction(tx);

  try {
    const sendTx = await provider.broadcastTransaction(signedTx);
    console.log("Transaction hash:", sendTx.hash);
    const receipt = await sendTx.wait();
    if (!receipt) {
      throw Error();
    }
    console.log("Contract deployed at address:", receipt.contractAddress);
  } catch (err) {
    throw err;
  }
}

deploy();
