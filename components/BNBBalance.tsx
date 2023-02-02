import { useAccount, useBalance } from "wagmi";

const BNBBalance = () => {
  const { address, isConnected } = useAccount();
  const { data, isLoading, isError } = useBalance({
    address,
    chainId: 56,
  });

  if (isLoading) return <div>…</div>;
  if (isError) return <div>error</div>;

  return (
    <div className="mt-36 sm:mt-40 text-center">
      <p className="text-4xl sm:text-8xl font-semibold m-0">$0.00</p>
      <p
        className="font-medium text-xs sm:text-sm"
        style={{ color: "#2C2D2F" }}
      >
        BNB Balance: {data ? (data.formatted.slice(0, data.formatted.indexOf(".") + 9)) : 0}
      </p>
    </div>
  );
};

export default BNBBalance;
