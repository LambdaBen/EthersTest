import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ERC721Module = buildModule("ERC721Module", (m) => {
  const ERC721 = m.contract("MyNFT");

  return { ERC721 };
});

export default ERC721Module;
