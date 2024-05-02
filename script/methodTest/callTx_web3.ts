import Web3 from "web3";

const web3 = new Web3(
  "https://ethereum-mainnet.nodit.io/-K5v1arBZA9ZC-tYoG9rYbwTLCuAHo8a"
);
const contractAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const abi = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];
const contract = new web3.eth.Contract(abi, contractAddress);

async function test() {
  try {
    const tx = await contract.methods.name().call();
    console.log(tx);
  } catch (err) {
    console.error(err);
  }
}
test();
