import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const token_amount = 1000000;
const token_name = "TestToken";
const token_symbol = "TT";

const ERC20Module = buildModule("ERC20Module", (m) => {
  const amount = m.getParameter("amount", token_amount);
  const name = m.getParameter("name", token_name);
  const symbol = m.getParameter("symbol", token_symbol);

  const ERC20 = m.contract("TestToken", [amount, name, symbol]);

  return { ERC20 };
});

export default ERC20Module;
