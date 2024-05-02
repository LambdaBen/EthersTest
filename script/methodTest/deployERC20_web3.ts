import Web3 from "web3";
import dotenv from "dotenv";
import { bytecode } from "./data/erc20bytecode";
import { erc20abi } from "./data/erc20abi";
dotenv.config({ path: "../../.env" });

const nodit = process.env.NODIT_SEPOLIA_RPC_URL;
const alchemy = process.env.ALCHEMY_SEPOLIA_RPC_URL;
const infura = process.env.INFURA_SEPOLIA_RPC_URL;
const quicknode = process.env.QUICKNODE_SEPOLIA_RPC_URL;

const web3 = new Web3(nodit);
let count = 0;

async function deployContract(): Promise<any> {
  try {
    const privateKey = process.env.PRIVATE_KEY;

    if (!privateKey) {
      throw Error();
    }
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);

    // Create contract instance
    const contract = new web3.eth.Contract(erc20abi);

    const gas = await contract
      .deploy({
        data: bytecode,
      })
      .estimateGas();

    const rawTx = {
      nonce: await web3.eth.getTransactionCount(account.address),
      gasPrice: web3.utils.numberToHex(2946462210),
      gasLimit: web3.utils.toHex(gas),
      data: bytecode,
    };

    const signedTx = await web3.eth.accounts.signTransaction(rawTx, privateKey);
    // Send raw transaction
    const txReceipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );
    count++;
    console.log(count);
  } catch (error) {
    console.error(error);
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function multicall() {
  for (let i = 0; i < 10; i++) {
    const result = await deployContract();
    console.log(result);
  }
}

multicall();
