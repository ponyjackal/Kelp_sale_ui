import { useState, useMemo } from "react";
import Head from "next/head";
import { useAccount } from "wagmi";
import { BigNumber, utils } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import Header from "../components/Header";
import Countdown from "../components/CountDown";
import TotalRaised from "../components/TotalRaised";
import Button from "../components/Button";
import Input from "../components/Input";
import ConfirmPurchase from "../components/ConfirmPurchase";
import ETHBalance from "../components/ETHBalance";
import TokenBalance from "../components/TokenBalance";
import useBNBPrice from "../hooks/useBNBPrice";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

type Address = `0x${string}`;

const tokenAddress = process.env.NEXT_PUBLIC_KELP_TOKEN_ADDRESS as Address;

const kelpPrice = "0.001";

function Home() {
  const { address, isConnected } = useAccount();

  const [confirmPurchaseModal, setConfirmPurchaseModal] =
    useState<boolean>(false);

  const [amount, setAmount] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { data: bnbPrice } = useBNBPrice();

  const bnbPriceString = bnbPrice
    ? utils.formatEther(bnbPrice as BigNumber).slice(0, 6)
    : "0.0";

  const bnbAmount = useMemo(() => {
    if (!bnbPrice || !amount) {
      return "0.0";
    }

    return utils.formatEther(
      utils
        .parseEther(amount)
        .mul(utils.parseEther(kelpPrice))
        .div(bnbPrice as BigNumber)
    );
  }, [bnbPrice, amount]);

  const notifySuccess = () => {
    toast.success("You bought Kelp token successfully!", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const notifyError = () => {
    toast.error("Something went wrong!", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setAmount(e.target.value);
  };

  const handleBuy = () => {
    if (!amount) {
      setError("Amount is required");
      return;
    }

    if (!isConnected || !address) {
      setError("Please connect your wallet");
      return;
    }

    setConfirmPurchaseModal(true);
  };

  const handleTx = (isSuccess: boolean) => {
    if (isSuccess) {
      notifySuccess();
    } else {
      notifyError();
    }
    setConfirmPurchaseModal(false);
  };

  return (
    <div className="h-screen bg-gray-2">
      <Head>
        <title>KELP Private Sale</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="px-8 sm:px-24 py-8 sm:py-16 bg-gray-2">
        <section className="block sm:hidden mb-8 sm:mb-0">
          {isConnected && (
            <div className="grid grid-cols-2 gap-4 mr-8">
              <ETHBalance />

              <TokenBalance tokenAddress={tokenAddress} />
            </div>
          )}
        </section>
        <section>
          <h1 className="text-gray-1 text-left font-bold leading-6 text-2xl md:text-3xl">
            PRIVATE SALE
          </h1>
        </section>

        <Countdown date={"2023-01-31T14:48:00.000+09:00"} />

        <TotalRaised />

        <div className="flex justify-center items-center text-center mt-24">
          <h2 className="text-gray-1 font-bold leading-6 text-xl sm:text-2xl">
            Kelp Price: ${kelpPrice}
          </h2>
          <h2 className="text-gray-1 font-bold leading-6 text-xl sm:text-2xl ml-4">
            BNB Price: ${bnbPriceString}
          </h2>
        </div>

        <div className="flex flex-col justify-center items-center mt-12">
          <div className="flex justify-center items-center">
            <Input label="Kelp amount" value={amount} onChange={handleChange} />
            <Button className="font-bold text-2xl ml-8" onClick={handleBuy}>
              Buy
            </Button>
          </div>
          {error && <p className="text-red text-lg">{error}</p>}
        </div>
        {confirmPurchaseModal && (
          <ConfirmPurchase
            show={confirmPurchaseModal}
            onHide={() => setConfirmPurchaseModal(false)}
            bnbAmount={bnbAmount}
            amount={amount}
            kelpPrice={kelpPrice}
            onSettle={handleTx}
          />
        )}
      </main>
      <ToastContainer />
    </div>
  );
}

export default Home;
