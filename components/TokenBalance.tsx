import { useAccount, useBalance } from "wagmi";
import { parseBalance } from "../util";

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
    <p className="token-balance-text">
      {`${data?.symbol} Balance`}:{" "}
      <strong>{data ? parseBalance(data?.value ?? 0) : 0}</strong>
    </p>
  );
};

export default TokenBalance;
