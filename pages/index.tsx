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
import useKelpPrice from "../hooks/useKelpPrice";
import useLimitPerAccount from "../hooks/useLimitPerAccount";
import { KELP_TOKEN_ADDRESS } from "../utils/constants";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const { address, isConnected } = useAccount();
  const { kelpPrice } = useKelpPrice();
  const { limitPerAccount } = useLimitPerAccount();

  const [confirmPurchaseModal, setConfirmPurchaseModal] =
    useState<boolean>(false);

  const [usdAmount, setUSDAmount] = useState<string>("0.00");
  const [error, setError] = useState<string>("");

  const { data: bnbPrice } = useBNBPrice();

  const bnbPriceString = bnbPrice
    ? utils.formatEther(bnbPrice as BigNumber).slice(0, 6)
    : "0.0";

  const kelpAmount = parseFloat(usdAmount) / parseFloat(kelpPrice);

  const bnbAmount = useMemo(() => {
    if (!bnbPrice || kelpAmount <= 0.0) {
      return "0.0";
    }

    return utils.formatEther(
      utils
        .parseEther("" + kelpAmount)
        .mul(utils.parseEther(kelpPrice))
        .div(bnbPrice as BigNumber)
    );
  }, [bnbPrice, kelpAmount, kelpPrice]);

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
    let newValue = 0;
    if (e.target.value === "") {
      newValue = 0;
    } else {
      newValue = parseFloat(e.target.value) * 10;
    }
    setUSDAmount(parseFloat(newValue.toString()).toFixed(2));
  };

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.currentTarget.style.width = e.currentTarget.value.length + "ch";
    e.currentTarget.style.color = "black";
    if (e.currentTarget.parentElement) {
      e.currentTarget.parentElement.getElementsByTagName(
        "span"
      )[0].style.color = "black";
    }
    const value = e.currentTarget.value;
    e.currentTarget.value = "";
    e.currentTarget.value = value;
  };

  const handleTouch = (e: React.TouchEvent<HTMLInputElement>) => {
    e.currentTarget.style.width = e.currentTarget.value.length + "ch";
    e.currentTarget.style.color = "black";
    if (e.currentTarget.parentElement) {
      e.currentTarget.parentElement.getElementsByTagName(
        "span"
      )[0].style.color = "black";
    }
    const value = e.currentTarget.value;
    e.currentTarget.value = "";
    e.currentTarget.value = value;
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.currentTarget.style.width = e.currentTarget.value.length + "ch";
    setUSDAmount(e.currentTarget.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.currentTarget.style.color = "black";
    if (e.currentTarget.parentElement) {
      e.currentTarget.parentElement.getElementsByTagName(
        "span"
      )[0].style.color = "black";
    }
    if (e.key === "Delete" || e.key === "Backspace") {
      setUSDAmount("0.00");
    }
    if (
      e.key === "Left" ||
      e.key === "ArrowLeft" ||
      e.key === "Right" ||
      e.key === "ArrowRight" ||
      e.key === "Up" ||
      e.key === "ArrowUp" ||
      e.key === "Down" ||
      e.key === "ArrowDown"
    ) {
      e.preventDefault();
    }
  };

  const handleBuy = () => {
    if (!usdAmount || parseFloat(usdAmount) <= 0) {
      setError("Invalid Amount");
      return;
    }

    if (!isConnected || !address) {
      setError("Please connect your wallet");
      return;
    }

    if (
      limitPerAccount !== "0.0" &&
      parseFloat(usdAmount) > parseFloat(limitPerAccount)
    ) {
      setError("Limit amount per account exceed");
      return;
    }

    setConfirmPurchaseModal(true);
  };

  const handleMaxButton = () => {
    setUSDAmount(limitPerAccount);
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

      <main className="px-8 md:px-56 py-8 sm:py-16 bg-gray-2">
        <section className="block sm:hidden">
          {isConnected && (
            <div className="grid grid-cols-1 gap-4 mr-8">
              <TokenBalance tokenAddress={KELP_TOKEN_ADDRESS} />
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

        <div>
          <div>
            <span id={"enter-amount-text"}>ENTER AMOUNT</span>
            <Input
              value={usdAmount}
              onPaste={(e) => {
                e.preventDefault();
              }}
              hasLimit={limitPerAccount !== "0.0"}
              onChange={handleChange}
              onClick={handleClick}
              onTouch={handleTouch}
              onKeyDown={handleKeyDown}
              onKeyUp={handleKeyUp}
              handleMaxButton={handleMaxButton}
            />
            <ETHBalance />
            <Button
              className="center-items buy-kelp-btn font-bold text-2xl ml-8 px-5"
              onClick={handleBuy}
            >
              Buy Kelp
            </Button>
          </div>
          {error && <p className="text-red text-lg">{error}</p>}
        </div>
        {confirmPurchaseModal && (
          <ConfirmPurchase
            show={confirmPurchaseModal}
            onHide={() => setConfirmPurchaseModal(false)}
            bnbAmount={bnbAmount}
            kelpAmount={kelpAmount}
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
