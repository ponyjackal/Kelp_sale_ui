import Image from "next/image";
import React, { useState } from "react";
import { useAccount, useBalance } from "wagmi";
import { parseBalance } from "../util";
import useBNBPrice from "../hooks/useBNBPrice";
import { BigNumber, FixedNumber, utils } from "ethers";

const PaymentMethod = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const { address, isConnected } = useAccount();
  const { data, isError, isLoading } = useBalance({
    address,
    chainId: 56,
  });
  const { data: bnbPrice } = useBNBPrice();
  const white_color = "#FFFFFF";

  return (
    <>
      <div>
        <p className="text-gray-1 sub-heading-text">
          PAYMENT METHOD
        </p>
        <div className="grid grid-cols-2 lg:gap-12 md:gap-7 xs:gap-4 xxs:gap-4 xxxs:gap-4 md:grid-cols-2 xxxs:grid-cols-1">
          {/* <div className="flex justify-between flex-wrap"> */}
          <button onClick={() => setSelectedOption("BNB")}>
            <div
              className={`${
                selectedOption === "BNB" ? "toggle-btn" : ""
              } payment-option-card p-3 flex justify-between items-center rounded-lg`}
            >
              <div>
                <Image src={"/BNB.png"} className="xxxs:w-8 md:w-10" width={40} height={40} alt="" />
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
                  {parseBalance(data?.value ?? 0)}
                </h2>
                <p
                  className={`${
                    selectedOption === "BNB" ? "text-white" : "text-gray-1"
                  } m-0 text-xs`}
                >
                  ${FixedNumber.from(parseBalance((bnbPrice as BigNumber), 18, 6)).mulUnsafe(FixedNumber.from(parseBalance((data?.value ?? 0), 18, 6))).round(2)._value}
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
                <Image src={"/BUSD.png"} className="xxxs:w-9 md:w-12" width={40} height={40} alt="" />
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
                  0.000
                </h2>
                <p
                  className={`${
                    selectedOption === "BUSD" ? "text-white" : "text-gray-1"
                  } m-0 text-xs`}
                >
                  $0.00
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
