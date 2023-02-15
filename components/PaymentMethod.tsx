import Image from "next/image";
import React from "react";
import { useAccount, useBalance } from "wagmi";
import { getFixedAmount } from "../utils/util";
import useBNBPrice from "../hooks/useBNBPrice";
import { BigNumber, utils } from "ethers";
import { PaymentType, Address } from "../utils/types";

const BUSD_ADDRESS = process.env.NEXT_PUBLIC_BUSD_ADDRESS as Address;

type PaymentMethodProps = {
  selectedOption: PaymentType;
  setSelectedOption: (type: PaymentType) => void;
};

const PaymentMethod = ({
  selectedOption,
  setSelectedOption,
}: PaymentMethodProps) => {
  const { address, isConnected } = useAccount();
  const {
    data: dataBNB,
    isError: isErrorBNB,
    isLoading: isLoadingBNB,
  } = useBalance({
    address,
    chainId: 56,
    watch: true,
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
  const { data: bnbPrice } = useBNBPrice();

  return (
    <>
      <div>
        <p className="text-gray-1 sub-heading-text">PAYMENT METHOD</p>
        <div className="grid grid-cols-2 lg:gap-12 md:gap-7 xs:gap-4 xxs:gap-4 xxxs:gap-4 md:grid-cols-2 xxxs:grid-cols-1">
          <button onClick={() => setSelectedOption("BNB")}>
            <div
              className={`${
                selectedOption === "BNB" ? "toggle-btn" : ""
              } payment-option-card p-3 flex justify-between items-center rounded-lg`}
            >
              <div>
                <Image
                  src={"/BNB.png"}
                  className="xxxs:w-8 md:w-10"
                  width={40}
                  height={40}
                  alt=""
                />
              </div>
              <div className="text-left">
                <h2
                  className={`${
                    selectedOption === "BNB" && "text-white"
                  } md:text-2xl xxxs:text-lg font-bold m-0`}
                >
                  BNB
                </h2>
                <p
                  className={`${
                    selectedOption === "BNB" ? "text-white" : "text-gray-1"
                  } m-0 text-xs`}
                >
                  Binance Smart Chain
                </p>
              </div>
              <div className="text-right">
                <h2
                  className={`${
                    selectedOption === "BNB" && "text-white"
                  } md:text-2xl xxxs:text-lg font-bold m-0`}
                >
                  {dataBNB ? getFixedAmount(dataBNB.formatted) : 0}
                </h2>
                <p
                  className={`${
                    selectedOption === "BNB" ? "text-white" : "text-gray-1"
                  } m-0 text-xs`}
                >
                  $
                  {dataBNB?.value
                    ? getFixedAmount(
                        utils.formatEther(
                          (bnbPrice as BigNumber)
                            .mul(dataBNB?.value)
                            .div(utils.parseEther("1"))
                        ),
                        2
                      )
                    : "0.00"}
                </p>
              </div>
            </div>
          </button>
          <button onClick={() => setSelectedOption("BUSD")}>
            <div
              className={`${
                selectedOption === "BUSD" ? "toggle-btn" : ""
              } payment-option-card p-3 flex justify-between items-center rounded-lg`}
            >
              <div>
                <Image
                  src={"/BUSD.png"}
                  className="xxxs:w-9 md:w-12"
                  width={40}
                  height={40}
                  alt=""
                />
              </div>
              <div className="text-left">
                <h2
                  className={`${
                    selectedOption === "BUSD" && "text-white"
                  } md:text-2xl xxxs:text-lg font-bold m-0`}
                >
                  BUSD
                </h2>
                <p
                  className={`${
                    selectedOption === "BUSD" ? "text-white" : "text-gray-1"
                  } m-0 text-xs`}
                >
                  Binance Smart Chain
                </p>
              </div>
              <div className="text-right">
                <h2
                  className={`${
                    selectedOption === "BUSD" && "text-white"
                  } md:text-2xl xs:text-lg xxs:text-lg xxxs:text-lg font-bold m-0`}
                >
                  {dataBUSD?.formatted
                    ? getFixedAmount(dataBUSD.formatted, 2)
                    : 0}
                </h2>
                <p
                  className={`${
                    selectedOption === "BUSD" ? "text-white" : "text-gray-1"
                  } m-0 text-xs`}
                >
                  $
                  {dataBUSD?.formatted
                    ? getFixedAmount(dataBUSD.formatted, 2)
                    : "0.00"}
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentMethod;
