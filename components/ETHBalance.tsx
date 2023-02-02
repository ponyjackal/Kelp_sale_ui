import { useAccount, useBalance } from "wagmi";

const ETHBalance = () => {
  const { address, isConnected } = useAccount();
  const { data, isError, isLoading } = useBalance({
    address,
    chainId: 56,
  });

  if (isLoading) return <div>…</div>;
  if (isError) return <div>error</div>;

  return (
    <p className="eth-balance-text center-items">
      {isConnected && `BNB Balance: ${data ? (data.formatted.slice(0, data.formatted.indexOf(".") + 9)) : 0}`}
    </p>
  );
};

export default ETHBalance;
