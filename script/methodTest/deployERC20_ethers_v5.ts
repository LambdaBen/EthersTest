import { ethers } from "ethers";
import { bytecode } from "./data/erc20bytecode";
import { erc20abi } from "./data/erc20abi";

//여기는 미국 서버에서 CLI로 호출해야 해서 임의로 여기 넣은 값입니다. 미국 서버 안쓰면 .env에 설정해서 하시면 돼요.
// const NODIT_SEPOLIA_RPC_URL =
//   "https://ethereum-sepolia.nodit-dev.net/YeUfWz~CstuhLnwGZ3QPwN4JYp1JoPXK";
// const ALCHEMY_SEPOLIA_RPC_URL =
//   "https://eth-sepolia.g.alchemy.com/v2/UlU2GZbpcx0aKteFVa1hbYM0QVUj2skY";
// const INFURA_SEPOLIA_RPC_URL =
//   "https://sepolia.infura.io/v3/19b4e368728a4e858b67ab94cdea65ce";
// const QUICKNODE_SEPOLIA_RPC_URL =
//   "https://side-quaint-telescope.ethereum-sepolia.quiknode.pro/9fda577b194f0c6c7bf0878efdfec73ea5933d33/";
// const PRIVATE_KEY =
//   "";
// const ETHERSCAN_API_KEY = "ANAGU1GS9UXB7IFKK2V9M5DW1QC4AWCJGM";
// const TEST_PRIVATE_KEY =
//   "";

const provider = new ethers.providers.JsonRpcProvider(NODIT_SEPOLIA_RPC_URL);

if (!PRIVATE_KEY) {
  throw Error("Private Key X");
}
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

async function deploy() {
  try {
    const contract = new ethers.ContractFactory(erc20abi, bytecode, signer);
    const deploy = await contract.deploy();
    console.log(deploy);
  } catch (err) {
    throw err;
  }
}

async function test() {
  for (let i = 0; i < 10; i++) {
    const result = await deploy();
  }
}

test();
