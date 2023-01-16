import { useAccount, useBalance } from "wagmi";
import { parseBalance } from "../util";

type TokenBalanceProps = {
  tokenAddress: `0x${string}`;
};

const TokenBalance = ({ tokenAddress }: TokenBalanceProps) => {
  const { address, isConnected } = useAccount();
  const { data, isLoading, isError } = useBalance({
    address,
    token: "0x048AB7bb99c8a57F3eE0FbcCF196A2b37E5Be3D7",
    chainId: 56,
  });

  if (isLoading) return <div>…</div>;
  if (isError) return <div>error</div>;

  return (
    <p className="text-gray-dark">
      {`${data?.symbol} Balance`}:{" "}
      <strong>{parseBalance(data?.value ?? 0)}</strong>
    </p>
  );
};

export default TokenBalance;
