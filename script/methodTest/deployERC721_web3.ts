import Web3 from "web3";
import dotenv from "dotenv";
import { bytecode } from "./data/erc721bytecode";
import { erc721abi } from "./data/erc721abi";
dotenv.config({ path: "../../.env" });

const nodit = process.env.NODIT_SEPOLIA_RPC_URL;
const alchemy = process.env.ALCHEMY_SEPOLIA_RPC_URL;
const infura = process.env.INFURA_SEPOLIA_RPC_URL;
const quicknode = process.env.QUICKNODE_SEPOLIA_RPC_URL;

const web3 = new Web3(nodit);
async function deployContract(): Promise<any> {
  try {
    const privateKey = process.env.PRIVATE_KEY;

    if (!privateKey) {
      throw Error();
    }
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);

    // Create contract instance
    const contract = new web3.eth.Contract(erc721abi);

    // Estimate gas
    const gas = await contract
      .deploy({
        data: bytecode,
      })
      .estimateGas();

    // Prepare raw transaction
    const rawTx = {
      nonce: await web3.eth.getTransactionCount(account.address),
      gasPrice: web3.utils.numberToHex(99464622),
      gasLimit: web3.utils.toHex(gas),
      data: bytecode,
    };

    // Sign transaction
    const signedTx = await web3.eth.accounts.signTransaction(rawTx, privateKey);

    // Send raw transaction
    const txReceipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );

    console.log("Contract deployed to address:", txReceipt.contractAddress);
  } catch (error) {
    console.error("Error deploying contract:", error);
  }
}

deployContract();
