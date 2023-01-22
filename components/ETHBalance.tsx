import { useAccount, useBalance } from "wagmi";
import { parseBalance } from "../util";

const ETHBalance = () => {
  const { address } = useAccount();
  const { data, isError, isLoading } = useBalance({
    address,
    chainId: 56,
  });

  if (isLoading) return <div>…</div>;
  if (isError) return <div>error</div>;

  return (
    <p className="eth-balance-text center-items">
      BNB Balance: {parseBalance(data?.value ?? 0)}
    </p>
  );
};

export default ETHBalance;
