import { useEffect, useState, useMemo } from "react";
import Head from "next/head";
import { useAccount, useBalance } from "wagmi";
import { BigNumber, FixedNumber, utils } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import Header from "../components/Header";
import Countdown from "../components/CountDown";
import TotalRaised from "../components/TotalRaised";
import Button from "../components/Button";
import Input from "../components/Input";
import ConfirmPurchase from "../components/ConfirmPurchase";
import TokenBalance from "../components/TokenBalance";
import useBNBPrice from "../hooks/useBNBPrice";
import useKelpPrice from "../hooks/useKelpPrice";
import useLimitPerAccount from "../hooks/useLimitPerAccount";
import { KELP_TOKEN_ADDRESS } from "../utils/constants";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import PaymentMethod from "../components/PaymentMethod";
import { parseBalance } from "../util";

function Home() {
  const { address, isConnected } = useAccount();
  const { kelpPrice } = useKelpPrice();
  const { limitPerAccount } = useLimitPerAccount();

  const [confirmPurchaseModal, setConfirmPurchaseModal] =
    useState<boolean>(false);

  const [usdAmount, setUSDAmount] = useState<string>("0.00");
  const [error, setError] = useState<string>("");

  const { data: bnbPrice } = useBNBPrice();
  const { data, isError, isLoading } = useBalance({
    address,
    chainId: 56,
  });

  const bnbPriceString = bnbPrice
    ? utils.formatEther(bnbPrice as BigNumber).slice(0, 6)
    : "0.0";

  const kelpAmount = parseFloat(usdAmount) / parseFloat(kelpPrice);

  const bnbAmount = useMemo(() => {
    if (!bnbPrice || kelpAmount <= 0.0 || Number.isNaN(kelpAmount)) {
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

  const mouseClickEvents = ['mousedown', 'click', 'mouseup'];
  function simulateMouseClick(element: HTMLElement) {
    mouseClickEvents.forEach(mouseEventType =>
      element.dispatchEvent(
        new MouseEvent(mouseEventType, {
          view: window,
          bubbles: true,
          cancelable: false
        })
      )
    );
  }

  useEffect(() => {
    let inputElement = document.getElementById('input-amount-value');
    if (inputElement)
      simulateMouseClick(inputElement);
  }, [usdAmount]);

  const handleMin = () => {
    let minValue = FixedNumber.from(parseBalance((bnbPrice as BigNumber ?? "0"), 18, 8)).mulUnsafe(FixedNumber.from(data?.formatted ?? "0")).mulUnsafe(FixedNumber.from("0.25")).round(3)._value.slice(0, -1);
    if (minValue.charAt(minValue.length - 2) === '.')
      minValue = minValue.concat("0");
    setUSDAmount(minValue);
  }

  const handleHalf = () => {
    let halfValue = FixedNumber.from(parseBalance((bnbPrice as BigNumber ?? "0"), 18, 8)).mulUnsafe(FixedNumber.from(data?.formatted ?? "0")).mulUnsafe(FixedNumber.from("0.50")).round(3)._value.slice(0, -1);
    if (halfValue.charAt(halfValue.length - 2) === '.')
      halfValue = halfValue.concat("0");
    setUSDAmount(halfValue);
  }

  const handleMax = () => {
    let maxValue = FixedNumber.from(parseBalance((bnbPrice as BigNumber ?? "0"), 18, 8)).mulUnsafe(FixedNumber.from(data?.formatted ?? "0")).round(3)._value.slice(0, -1);
    if (maxValue.charAt(maxValue.length - 2) === '.')
      maxValue = maxValue.concat("0");
    setUSDAmount(maxValue);
  }

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

  const handleTx = (isSuccess: boolean) => {
    if (isSuccess) {
      notifySuccess();
    } else {
      notifyError();
    }
    setConfirmPurchaseModal(false);
  };

  return (
    <div className="bg-gray-2" style={{ overflowY: "scroll", height: "100vh" }}>
      <Head>
        <title>KELP Private Sale</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="container bg-white rounded-xl p-0">
        <div className="md:px-10 md:py-12 xxxs:p-5 container-div" style={{ marginBottom: "50px" }}>
          <section>
            <h1 className="text-gray-1 text-center heading-text">
              PRIVATE SALE
            </h1>
          </section>

          <Countdown date={"2023-03-01T14:48:00.000+09:00"} />

          <TotalRaised />

          {isConnected && (
            <PaymentMethod />
          )}

          {/* <div className="flex justify-center items-center text-center mt-24">
            <h2 className="text-gray-1 font-bold leading-6 text-xl sm:text-2xl">
              Kelp Price: ${kelpPrice}
            </h2>
            <h2 className="text-gray-1 font-bold leading-6 text-xl sm:text-2xl ml-4">
              BNB Price: ${bnbPriceString}
            </h2>
          </div> */}

          <div>
            <div className="text-left my-6">
              {/* <span className="text-left" id={"enter-amount-text"}>ENTER AMOUNT</span> */}
              <span className="sub-heading-text text-gray-1">
                ENTER AMOUNT
              </span>
              <div className="flex flex-wrap xxs:justify-between xxxs:justify-center xxxs:mb-2 xxs:mb-0 items-center">
                <div>
                  <Input
                    value={usdAmount}
                    onPaste={(e) => {
                      e.preventDefault();
                    }}
                    onChange={handleChange}
                    onClick={handleClick}
                    onTouch={handleTouch}
                    onKeyDown={handleKeyDown}
                    onKeyUp={handleKeyUp}
                  />
                </div>
                {isConnected && (
                  <div className="flex">
                    <p className="me-4 text-gray-1 mb-0 base-options-text" onClick={handleMin}>
                      MIN
                    </p>
                    <p className="me-4 text-gray-1 mb-0 base-options-text" onClick={handleHalf}>
                      HALF
                    </p>
                    <p className="text-gray-1 mb-0 base-options-text" onClick={handleMax}>ALL</p>
                  </div>
                )}
              </div>
            </div>
            <Button
              className="center-items buy-kelp-btn"
              onClick={handleBuy}
            >
              Buy Kelp
            </Button>
            {error && <p className="text-red text-lg">{error}</p>}
          </div>
          {confirmPurchaseModal && (
            <ConfirmPurchase
              show={confirmPurchaseModal}
              onHide={() => setConfirmPurchaseModal(false)}
              bnbAmount={bnbAmount}
              bnbPrice={bnbPrice as BigNumber}
              usdAmount={usdAmount}
              kelpAmount={kelpAmount}
              kelpPrice={kelpPrice}
              onSettle={handleTx}
            />
          )}
        </div>
      </main>
      <ToastContainer />
    </div>
  );
}

export default Home;
