import { useAccount, useBalance } from "wagmi";
import { parseBalance } from "../util";
import Image from "next/image";
import tokenLogo from "../public/token-logo.png";

type TokenBalanceProps = {
  tokenAddress: `0x${string}`;
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
    <button type="button" className="token-balance-text text-green-1 btn-header btn">
      <Image
        className="kelp-token-logo"
        src={tokenLogo}
        alt={data?.symbol || "tKELP"}
      ></Image>
      <strong className="token-balance-strong">
        {data ? (data?.formatted ?? "0") : 0}
      </strong>
    </button>
  );
};

export default TokenBalance;
