import { useAccount, useBalance } from "wagmi";
import Image from "next/image";
import tokenLogo from "../public/token-logo.png";
import { Address } from "../utils/types";

type TokenBalanceProps = {
  tokenAddress: Address;
};

const TokenBalance = ({ tokenAddress }: TokenBalanceProps) => {
  const { address } = useAccount();
  const { data } = useBalance({
    address,
    token: tokenAddress,
    chainId: 56,
    watch: true,
  });

  return (
    <button
      type="button"
      className="token-balance-text text-green-1 btn-header btn"
    >
      <Image
        className="kelp-token-logo"
        src={tokenLogo}
        alt={data?.symbol || "tKELP"}
      ></Image>
      <strong className="token-balance-strong">
        {data ? data.formatted.slice(0, data.formatted.indexOf(".") + 7) : 0}
      </strong>
    </button>
  );
};

export default TokenBalance;
