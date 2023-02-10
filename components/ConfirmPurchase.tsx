import React, { FunctionComponent, useEffect, useState } from "react";
import Image from "next/image";
import { useAccount } from "wagmi";
import { Modal } from "react-bootstrap";
import Button from "./Button";
import useBuyKelpBNB from "../hooks/useBuyKelpBNB";
import useBuyKelpBUSD from "../hooks/useBuyKelpBUSD";
import useApproveBUSD from "../hooks/useApproveBUSD";
import { BigNumber } from "ethers";
import { parseBalance } from "../util";
import { PaymentType } from "../utils/types";

interface Props {
  show?: boolean;
  onHide: () => void;
  kelpAmount: number;
  bnbAmount: string;
  bnbPrice: BigNumber;
  usdAmount: string;
  kelpPrice: string;
  onSettle: (isSuccess: boolean) => void;
  paymentType: PaymentType;
}

const ConfirmPurchase: FunctionComponent<Props> = ({
  show,
  kelpAmount,
  bnbAmount,
  bnbPrice,
  usdAmount,
  kelpPrice,
  paymentType,
  onHide,
  onSettle,
}) => {
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const {
    data: dataBNB,
    isLoading: isLoadingBNB,
    isSuccess: isSuccessBNB,
    error: errorBNB,
    writeAsync: writeAsyncBNB,
    isIdle: isIdleBNB,
  } = useBuyKelpBNB(address ?? "", bnbAmount);
  const {
    data: dataBUSD,
    isLoading: isLoadingBUSD,
    isSuccess: isSuccessBUSD,
    error: errorBUSD,
    writeAsync: writeAsyncBUSD,
    isIdle: isIdleBUSD,
  } = useBuyKelpBUSD(address ?? "", usdAmount);
  const {
    data: dataApprove,
    isLoading: isLoadingApprove,
    isSuccess: isSuccessApprove,
    error: errorApprove,
    writeAsync: writeAsyncApprove,
    isIdle: isIdleApprove,
  } = useApproveBUSD(usdAmount);

  const [isWriting, setIsWriting] = useState<boolean>(false);
  const [hasApproved, setHasApproved] = useState<boolean>(false);
  const isLoading = paymentType === "BNB" ? isLoadingBNB : isLoadingBUSD;

  const handlePurchase = () => {
    if (paymentType === "BNB") {
      if (writeAsyncBNB) {
        writeAsyncBNB();
      }
    } else {
      if (writeAsyncBUSD) {
        writeAsyncBUSD();
      }
    }
  };

  const handleApprove = () => {
    if (paymentType === "BUSD") {
      if (writeAsyncApprove) {
        writeAsyncApprove();
      }
    }
  };

  useEffect(() => {
    setHasApproved(false);
  }, [usdAmount]);

  useEffect(() => {
    const onTxSettle = async () => {
      setIsWriting(true);
      const res =
        paymentType === "BNB" ? await dataBNB?.wait() : await dataBUSD?.wait();
      setIsWriting(false);

      if (res && res.blockHash) {
        onSettle(true);
      } else {
        onSettle(false);
      }
    };

    if (paymentType === "BNB") {
      if (
        isSuccessBNB &&
        dataBNB &&
        !isLoadingBNB &&
        !errorBNB &&
        !isIdleBNB &&
        !isWriting
      ) {
        onTxSettle();
      }
    } else {
      if (
        isSuccessBUSD &&
        dataBUSD &&
        !isLoadingBUSD &&
        !errorBUSD &&
        !isIdleBUSD &&
        !isWriting
      ) {
        onTxSettle();
      }
    }
  }, [
    dataBNB,
    isLoadingBNB,
    isSuccessBNB,
    errorBNB,
    isWriting,
    isIdleBNB,
    dataBUSD,
    isLoadingBUSD,
    isSuccessBUSD,
    errorBUSD,
    isIdleBUSD,
    onSettle,
    paymentType,
  ]);

  useEffect(() => {
    const onTxSettle = async () => {
      setIsWriting(true);
      const res = await dataApprove?.wait();
      setIsWriting(false);

      if (res && res.blockHash) {
        setHasApproved(true);
      } else {
        setHasApproved(false);
      }
    };

    if (paymentType === "BUSD") {
      if (
        isSuccessApprove &&
        dataApprove &&
        !isLoadingApprove &&
        !errorApprove &&
        !isIdleApprove &&
        !isWriting &&
        !hasApproved
      ) {
        onTxSettle();
      }
    }
  }, [
    dataApprove,
    isLoadingApprove,
    isSuccessApprove,
    errorApprove,
    isWriting,
    isIdleApprove,
    onSettle,
    paymentType,
    hasApproved,
  ]);

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <Image
            src={"/modal/close.png"}
            alt="close"
            className="ml-auto cursor-pointer"
            onClick={() => onHide()}
            width={15}
            height={15}
          />
          <p className="text-xl leading-9" style={{ color: "#CDCECE" }}>
            SUMMARY
          </p>
          <ul className="events pl-0">
            <p
              className="mb-0 ml-12 text-base font-medium"
              style={{ color: "#B0B0B0" }}
            >
              YOU PAY
            </p>
            <li>
              <Image
                src={"/modal/progressbar_1.png"}
                alt=""
                className="image1"
                width={40}
                height={40}
              />
              <time dateTime="10:03"></time>

              <span
                className="pl-7 pb-10 text-xs leading-6 font-medium"
                style={{ color: "#CDCECE" }}
              >
                <p
                  className="mb-0 lg:text-3xl md:text-3xl xs:text-2xl xxs:text-1xl xxxs:text-1xl leading-10 font-bold"
                  style={{ color: "#2C2D2F" }}
                >
                  ${usdAmount}
                </p>{" "}
                {bnbAmount.slice(0, bnbAmount.indexOf(".") + 9)} BNB x $
                {parseBalance(bnbPrice ?? "0", 18, 2)} / BNB
              </span>
            </li>

            <li>
              <Image
                src={"/modal/progressbar_2.png"}
                alt=""
                className="image"
                width={20}
                height={20}
              />
              <time dateTime="10:03"></time>

              <span
                className="pl-7 pb-10 text-xs leading-6 font-medium"
                style={{ color: "#CDCECE" }}
              >
                <p
                  className="text-xs leading-6 mt font-medium mb-0"
                  style={{ color: "#2C2D2F" }}
                >
                  $1.34 USD Transaction fee
                </p>{" "}
                0.002342342 BNB Transaction fee x $
                {parseBalance(bnbPrice ?? "0", 18, 2)} / BNB
              </span>
            </li>
            <li>
              <Image
                src={"/modal/progressbar_3.png"}
                alt=""
                className="image"
                width={20}
                height={20}
              />
              <time dateTime="10:03"></time>
              <span
                className="pl-7 pb-10 text-xs leading-6 font-medium mt"
                style={{ color: "#2C2D2F" }}
              >
                $4.66 USD Subtotal
              </span>
            </li>
            <li>
              <Image
                src={"/modal/progressbar_4.png"}
                alt=""
                className="image"
                width={20}
                height={20}
              />
              <time dateTime="10:03"></time>
              <span
                className="pl-7 pb-14 text-xs leading-6 font-medium  mt"
                style={{ color: "#2C2D2F" }}
              >
                ${kelpPrice} per KELP
              </span>
            </li>
            <li>
              <Image
                src={"/modal/progressbar_5.png"}
                alt=""
                className="image1"
                width={40}
                height={40}
              />
              <time className="last-time" dateTime="10:03"></time>
              <p
                className="pl-7 text-base font-medium mb-0 mt1"
                style={{ color: "#B0B0B0" }}
              >
                You Receive{" "}
                <p
                  className="lg:text-3xl md:text-3xl xs:text-2xl xxs:text-1xl xxxs:text-1xl leading-10 font-bold"
                  style={{ color: "#2C2D2F" }}
                >
                  {kelpAmount
                    .toString()
                    .slice(0, kelpAmount.toString().indexOf(".") + 7)}{" "}
                  Kelp
                </p>
              </p>
            </li>
          </ul>
          <div className="flex justify-end">
            {!hasApproved && paymentType === "BUSD" ? (
              <Button
                className="bg-color FFF md:px-12 lg:px-12 xs:px-10 xxs:px-10 xxxs:px-10 md:py-2.5 lg:py-2.5 xs:py-1 xxs:py-1 xxxs:py-1 text-base font-bold rounded-lg confirm-purchase-btn"
                onClick={handleApprove}
                disabled={!writeAsyncApprove}
              >
                {isLoadingApprove || isWriting ? "Approving ..." : "Approve"}
              </Button>
            ) : (
              <Button
                className="bg-color FFF md:px-12 lg:px-12 xs:px-10 xxs:px-10 xxxs:px-10 md:py-2.5 lg:py-2.5 xs:py-1 xxs:py-1 xxxs:py-1 text-base font-bold rounded-lg confirm-purchase-btn"
                onClick={handlePurchase}
                disabled={
                  paymentType === "BNB" ? !writeAsyncBNB : !writeAsyncBUSD
                }
              >
                {isLoading || isWriting ? "Loading ..." : "Confirm Purchase"}
              </Button>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ConfirmPurchase;
