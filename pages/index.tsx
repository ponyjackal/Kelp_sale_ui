import { useEffect, useState, useMemo } from "react";
import Head from "next/head";
import { useAccount, useBalance, useSwitchNetwork } from "wagmi";
import { BigNumber, utils } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import Header from "../components/Header";
import Countdown from "../components/CountDown";
import TotalRaised from "../components/TotalRaised";
import Button from "../components/Button";
import Input from "../components/Input";
import ConfirmPurchase from "../components/ConfirmPurchase";
import useBNBPrice from "../hooks/useBNBPrice";
import useKelpPrice from "../hooks/useKelpPrice";
import useSales from "../hooks/useSales";
import useLimitPerAccount from "../hooks/useLimitPerAccount";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import PaymentMethod from "../components/PaymentMethod";
import { getFixedAmount } from "../utils/util";
import { PaymentType, Address } from "../utils/types";
import { SALE_TYPE } from "../utils/constants";

const BUSD_ADDRESS = process.env.NEXT_PUBLIC_BUSD_ADDRESS as Address;

function Home() {
  const { address, isConnected } = useAccount();
  const { chains, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork(
    {
      chainId: 56,
    }
  );

  const { kelpPrice } = useKelpPrice();
  const { limitPerAccount } = useLimitPerAccount();
  const { data: saleInfo } = useSales(SALE_TYPE);

  const [paymentType, setPaymentType] = useState<PaymentType>("BNB");

  const [confirmPurchaseModal, setConfirmPurchaseModal] =
    useState<boolean>(false);

  const [usdAmount, setUSDAmount] = useState<string>("0.00");
  const [error, setError] = useState<string>("");

  const { data: bnbPrice } = useBNBPrice();
  const {
    data: dataBNB,
    isError: isErrorBNB,
    isLoading: isLoadingBNB,
  } = useBalance({
    address,
    chainId: 56,
  });
  const {
    data: dataBUSD,
    isError: isErrorBUSD,
    isLoading: isLoadingBUSD,
  } = useBalance({
    address,
    chainId: 56,
    token: BUSD_ADDRESS,
    watch: true,
  });

  const bnbPriceString = bnbPrice
    ? utils.formatEther(bnbPrice as BigNumber).slice(0, 6)
    : "0.0";

  const kelpAmount = parseFloat(usdAmount) / parseFloat(kelpPrice);

  const startDateTime = new Date(
    saleInfo?.startTime ? saleInfo?.startTime.toNumber() * 1000 : 0
  ).toISOString();

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

  const mouseClickEvents = ["mousedown", "click", "mouseup"];
  function simulateMouseClick(element: HTMLElement) {
    mouseClickEvents.forEach((mouseEventType) =>
      element.dispatchEvent(
        new MouseEvent(mouseEventType, {
          view: window,
          bubbles: true,
          cancelable: false,
        })
      )
    );
  }

  useEffect(() => {
    let inputElement = document.getElementById("input-amount-value");
    if (inputElement) simulateMouseClick(inputElement);
  }, [usdAmount]);

  useEffect(() => {
    if (switchNetwork) {
      switchNetwork();
    }
  }, [switchNetwork]);

  const getPartialAmount = (percentage: string) => {
    let value = "0.00";

    if (paymentType === "BNB" && dataBNB?.value) {
      value = getFixedAmount(
        utils.formatEther(
          (bnbPrice as BigNumber)
            .mul(dataBNB?.value)
            .mul(utils.parseEther(percentage))
            .div(utils.parseEther("1"))
            .div(utils.parseEther("1"))
        ),
        2
      );
    }

    if (paymentType === "BUSD" && dataBUSD?.value)
      value = getFixedAmount(
        utils.formatEther(
          (dataBUSD?.value as BigNumber)
            .mul(utils.parseEther(percentage))
            .div(utils.parseEther("1"))
        ),
        2
      );

    setUSDAmount(value);
    setError("");
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
        <div
          className="md:px-10 md:py-12 xxxs:p-5 container-div"
          style={{ marginBottom: "50px" }}
        >
          <section>
            <h1 className="text-gray-1 text-center heading-text">
              PRIVATE SALE
            </h1>
          </section>

          <Countdown date={startDateTime} />

          <TotalRaised />

          {isConnected && (
            <PaymentMethod
              selectedOption={paymentType}
              setSelectedOption={setPaymentType}
            />
          )}
          <div>
            <div className="text-left my-6">
              <span className="sub-heading-text text-gray-1">ENTER AMOUNT</span>
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
                    <p
                      className="me-4 text-gray-1 mb-0 base-options-text"
                      onClick={() => getPartialAmount("0.25")}
                    >
                      25%
                    </p>
                    <p
                      className="me-4 text-gray-1 mb-0 base-options-text"
                      onClick={() => getPartialAmount("0.5")}
                    >
                      HALF
                    </p>
                    <p
                      className="text-gray-1 mb-0 base-options-text"
                      onClick={() => getPartialAmount("1")}
                    >
                      ALL
                    </p>
                  </div>
                )}
              </div>
            </div>
            <Button className="center-items buy-kelp-btn" onClick={handleBuy}>
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
              kelpPrice={kelpPrice}
              onSettle={handleTx}
              paymentType={paymentType}
            />
          )}
        </div>
      </main>
      <ToastContainer />
    </div>
  );
}

export default Home;
