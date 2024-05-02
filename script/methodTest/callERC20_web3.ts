import Web3, { HexString8Bytes } from "web3";
import dotenv from "dotenv";
import { bytecode } from "./data/erc20bytecode";
import { erc20abi } from "./data/erc20abi";
dotenv.config({ path: "../../.env" });

const nodit = process.env.NODIT_SEPOLIA_RPC_URL;
const alchemy = process.env.ALCHEMY_SEPOLIA_RPC_URL;
const infura = process.env.INFURA_SEPOLIA_RPC_URL;
const quicknode = process.env.QUICKNODE_SEPOLIA_RPC_URL;

const web3 = new Web3(nodit);

async function callContract(): Promise<any> {
  try {
    const privateKey = process.env.PRIVATE_KEY;
    const testPrivateKey = process.env.TEST_PRIVATE_KEY;

    if (!privateKey || !testPrivateKey) {
      throw Error();
    }
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    // const approveAccount = "0xf285eD0035987C2566b2D15B8C4a6f438b58D9B9";
    const contractAddress = "0xFd3f4cc36856E26Fc84EB2F508A50B3A4D72E933";
    //0xF47dD282DF9a4D8881894bC5fD706640ec6e5CDb

    const testAddress = "0xBf54dDe15F8eD8ee20e96775C4A3Bb1dDe7fAbc4";
    const amount = web3.utils.numberToHex(10000);
    // const transferFromAmount = web3.utils.numberToHex(2000);
    const transferFunction = "transfer(address,uint256)";
    // const approveFunction = "approve(address,uint256)";
    // const transferFromFunction = "transferFrom(address,address,uint256)";

    function getSignature(signature: string): string {
      const getSig = web3.utils.keccak256(signature).slice(0, 10);
      return getSig;
    }

    function zeroPad(hexText: string): string {
      const slice0x = hexText.slice(2);
      const zeroPadValue = slice0x.padStart(64, "0");
      return zeroPadValue;
    }

    // const approveRawTx = {
    //   from: account.address,
    //   to: contractAddress,
    //   nonce: await web3.eth.getTransactionCount(account.address),
    //   gasPrice: web3.utils.toWei("100", "gwei"),
    //   gasLimit: 200000,
    //   data:
    //     getSignature(approveFunction) +
    //     zeroPad(approveAccount) +
    //     zeroPad(amount),
    // };

    const transferRawTx = {
      from: account.address,
      to: contractAddress,
      nonce: await web3.eth.getTransactionCount(account.address),
      data:
        getSignature(transferFunction) + zeroPad(testAddress) + zeroPad(amount),
      gasPrice: web3.utils.toWei("100", "gwei"),
      gasLimit: 200000,
    };

    // const transferFromRawTx = {
    //   from: approveAccount,
    //   to: contractAddress,
    //   nonce: await web3.eth.getTransactionCount(approveAccount),
    //   gasPrice: web3.utils.toWei("100", "gwei"),
    //   gasLimit: 200000,
    //   data:
    //     getSignature(transferFromFunction) +
    //     zeroPad(account.address) +
    //     zeroPad(testAddress) +
    //     zeroPad(transferFromAmount),
    // };

    const testSignedTx = await web3.eth.accounts.signTransaction(
      transferRawTx,
      privateKey
    );

    const txReceipt = await web3.eth.sendSignedTransaction(
      testSignedTx.rawTransaction
    );
    console.log(txReceipt);
  } catch (error) {
    console.error("Error deploying contract:", error);
  }
}

callContract();
