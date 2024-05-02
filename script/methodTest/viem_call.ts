import { getContract } from "viem";
import { erc20abi } from "./data/erc20abi";
import { createPublicClient, http } from "viem";
import { mainnet, sepolia } from "viem/chains";

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
});

async function getBlockNumber(): Promise<void> {
  const blockNumber = await publicClient.getBlockNumber();
  console.log(blockNumber);
}

getBlockNumber();
