import { Addressable, BaseContract, ethers } from "ethers";
import dotenv from "dotenv";
import { bytecode } from "./data/erc20bytecode";
import { erc20abi } from "./data/erc20abi";
dotenv.config({ path: "../../.env" });

const privateKey = process.env.PRIVATE_KEY;
const nodit = process.env.NODIT_SEPOLIA_RPC_URL;
const alchemy = process.env.ALCHEMY_SEPOLIA_RPC_URL;
const infura = process.env.INFURA_SEPOLIA_RPC_URL;
const quicknode = process.env.QUICKNODE_SEPOLIA_RPC_URL;

async function deployContract() {
  if (!privateKey) {
    throw Error();
  }
  try {
    // Create a provider
    const provider = new ethers.JsonRpcProvider(nodit);

    // Connect to the wallet, here we'll use a local wallet for simplicity
    const wallet = new ethers.Wallet(privateKey, provider);

    // Compile the contract
    const factory = new ethers.ContractFactory(erc20abi, bytecode, wallet);

    // Deploy the contract
    const contract = await factory.deploy();

    console.log(contract);
    return contract.target;
  } catch (error) {
    console.error("Error deploying contract:", error);
  }
}

// deployContract();

async function callRPC() {
  if (!privateKey) {
    throw Error();
  }
  const provider = new ethers.JsonRpcProvider(nodit);
  const wallet = new ethers.Wallet(privateKey, provider);
  const contract = new ethers.Contract(
    "0xA630FAA1E62525E41A612F9C02620E5b347E375f",
    erc20abi,
    wallet
  );

  const test = await contract.transfer(
    "0xf285eD0035987C2566b2D15B8C4a6f438b58D9B9",
    10000
  );
  console.log(test);
}

callRPC();
