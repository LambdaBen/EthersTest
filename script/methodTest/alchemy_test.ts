import { ethers } from "ethers";
import dotenv from "dotenv";
import { bytecode } from "./data/erc20bytecode";
import { erc20abi } from "./data/erc20abi";
import axios, { AxiosInstance } from "axios";
dotenv.config({ path: "../../.env" });

const nodit = process.env.NODIT_SEPOLIA_RPC_URL;
const alchemy = process.env.ALCHEMY_SEPOLIA_RPC_URL;
const infura = process.env.INFURA_SEPOLIA_RPC_URL;
const quicknode = process.env.QUICKNODE_SEPOLIA_RPC_URL;

const provider = new ethers.JsonRpcProvider(alchemy);

function createAxiosInstance(url: string): AxiosInstance {
  return axios.create({
    baseURL: url, // 기본 URL 설정
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function testAlchemy(url: string): Promise<void> {
  const instance = createAxiosInstance(url);

  const data = {
    method: "eth_estimateGas",
    params: [
      {
        from: "0xcfb94a79edc4e1f7e616bb998884d436b868bf85",
        to: "0x9a2c5733758c9e7e29ae632eeba88f077dbcfde2",
        data: "0x6a627842000000000000000000000000cfb94a79edc4e1f7e616bb998884d436b868bf85",
      },
      "latest",
    ],
    id: 75,
    jsonrpc: "2.0",
  };
  // {
  //   method: "eth_getTransactionReceipt",
  //   params: [
  //     "0xf4625e5f6eda5151d3357e20335a404cc5524cd2239eeca33aac5bcf5184e8d6",
  //   ],
  //   id: 76,
  //   jsonrpc: "2.0",
  // },
  // {
  //   method: "eth_getBlockReceipts",
  //   params: ["0x1257252"],
  //   id: 76,
  //   jsonrpc: "2.0",
  // };

  for (let i = 0; i < 100; i++) {
    const response = instance.post(url, data);
    console.log(response);
  }
}
if (!alchemy) {
  throw Error();
}

testAlchemy(alchemy);
