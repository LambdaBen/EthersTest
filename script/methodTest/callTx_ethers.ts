import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);

const privateKey = process.env.PRIVATE_KEY;
if (privateKey) {
  const wallet = new ethers.Wallet(privateKey, provider);
  const contractAddress = "0x95118CF03022f409d1738fA907FB9BF23672340f";
  const abi = [
    {
      inputs: [],
      name: "getMessage",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "initMessage",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "message",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "string", name: "_message", type: "string" }],
      name: "setMessage",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const contract = new ethers.Contract(contractAddress, abi, wallet);

  async function setMessage(message: string): Promise<any> {
    try {
      const tx = await contract.setMessage(message);
      console.log(tx);
    } catch (err) {
      console.error(err);
    }
  }
  setMessage("helloWorld");
} else {
  console.log("check Private key");
}
