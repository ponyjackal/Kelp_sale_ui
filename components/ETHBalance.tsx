import type { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import useETHBalance from "../hooks/useETHBalance";
import { parseBalance } from "../util";

const ETHBalance = () => {
  const { account } = useWeb3React<Web3Provider>();
  const { data } = useETHBalance(account);

  return (
    <p>
      BNB Balance: <strong>{parseBalance(data ?? 0)}</strong>
    </p>
  );
};

export default ETHBalance;
