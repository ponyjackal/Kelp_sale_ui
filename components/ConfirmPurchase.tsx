import React, { FunctionComponent } from "react";
import Image from "next/image";
import { useAccount } from "wagmi";
import { Modal } from "react-bootstrap";
import Button from "./Button";
import useBuyKelp from "../hooks/useBuyKelp";

interface Props {
  show?: boolean;
  onHide: () => void;
  amount: string;
  bnbAmount: string;
  kelpPrice: string;
}

const ConfirmPurchase: FunctionComponent<Props> = ({
  show,
  amount,
  bnbAmount,
  kelpPrice,
  onHide,
}) => {
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const { data, isLoading, isSuccess, write } = useBuyKelp(address);

  const handlePurchase = () => {
    console.log("address", address);
    // write();
  };

  return (
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
        <p className="font-bold text-xl leading-9">Summary</p>
        <ul className="events pl-0">
          <p
            className="mb-0 ml-12 text-base font-medium"
            style={{ color: "#B0B0B0" }}
          >
            You Pay
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
              className="pl-6 pb-10 lg:text-3xl md:text-3xl xs:text-2xl xxs:text-1xl xxxs:text-1xl leading-10 font-bold"
              style={{ color: "#2C2D2F" }}
            >
              {bnbAmount.slice(0, bnbAmount.indexOf(".") + 6)} BNB
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
                0.002342342 BNB Transaction fee
              </p>{" "}
              $1.34 USD Transaction fee
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
            <time dateTime="10:03"></time>
            <p
              className="pl-7 text-base font-medium mb-0 mt1"
              style={{ color: "#B0B0B0" }}
            >
              You Receive{" "}
              <p
                className="lg:text-3xl md:text-3xl xs:text-2xl xxs:text-1xl xxxs:text-1xl leading-10 font-bold"
                style={{ color: "#2C2D2F" }}
              >
                {amount} Kelp
              </p>
            </p>
          </li>
        </ul>
        <div className="flex justify-end">
          <Button
            className="bg-color FFF md:px-12 lg:px-12 xs:px-10 xxs:px-10 xxxs:px-10 md:py-2.5 lg:py-2.5 xs:py-1 xxs:py-1 xxxs:py-1 text-base font-bold rounded-lg md:mt-5 lg:mt-5 xs:mt-3 xxs:mt-3 xxxs:mt-3"
            onClick={handlePurchase}
          >
            Confirm Purchase
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmPurchase;
