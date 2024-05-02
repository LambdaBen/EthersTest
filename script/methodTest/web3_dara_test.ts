import Web3 from "web3";
import dotenv from "dotenv";
import { bytecode } from "./data/erc20bytecode";
import { erc20abi } from "./data/erc20abi";
dotenv.config({ path: "../../.env" });

const privateKey = process.env.PRIVATE_KEY;
const nodit = process.env.NODIT_SEPOLIA_RPC_URL;
const alchemy = process.env.ALCHEMY_SEPOLIA_RPC_URL;
const infura = process.env.INFURA_SEPOLIA_RPC_URL;
const quicknode = process.env.QUICKNODE_SEPOLIA_RPC_URL;

async function callMethod() {
  if (!privateKey) {
    throw Error();
  }
  try {
    const web3 = new Web3(alchemy);
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    const contract = new web3.eth.Contract(
      erc20abi,
      "0xA630FAA1E62525E41A612F9C02620E5b347E375f"
    );

    const test = await contract.methods
      .transfer("0x725E8FaA3f3C8A7526f58E817E559479395D68F2", 10000)
      .send({ from: account.address });

    console.log(test);

    return test;
  } catch (error) {
    console.error("Error deploying contract:", error);
  }
}

callMethod();
