import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Account from "../components/Account";
import ETHBalance from "../components/ETHBalance";
import TokenBalance from "../components/TokenBalance";
import useEagerConnect from "../hooks/useEagerConnect";
import Header from "../components/Header";

interface CountDownProps {
  hours: any;
  minutes: any;
  seconds: any;
  completed: any;
  days: any;
}

const CountDown = ({
  days,
  hours,
  minutes,
  seconds,
  completed,
}: CountDownProps) => {
  return (
    <>
      {/* {console.log()} */}
      <div className="grid grid-cols-4 md:mt-9 lg:mt-9">
        <div className="border_right">
          <p className="md:text-4xl lg:text-4xl xs:text-xl xxs:text-xl xxxs:text-xl font-light tracking-widest">
            {/* 03 */}
            {days}
          </p>
          <p className="text_color text-base xs:text-sm xxs:text-sm xxxs:text-sm xs:mb-1 xxs:mb-1 xxxs:mb-1 md:mb-2 lg:mb-2">
            DAYS
          </p>
        </div>
        <div className="border_right">
          <p className="md:text-4xl lg:text-4xl xs:text-xl xxs:text-xl xxxs:text-xl font-light tracking-widest">
            {hours}
          </p>
          <p className="text_color text-base xs:text-sm xxs:text-sm xxxs:text-sm xs:mb-1 xxs:mb-1 xxxs:mb-1 md:mb-2 lg:mb-2">
            HOURS
          </p>
        </div>
        <div className="border_right">
          <p className="md:text-4xl lg:text-4xl xs:text-xl xxs:text-xl xxxs:text-xl font-light tracking-widest">
            {minutes}
          </p>
          <p className="text_color text-base xs:text-sm xxs:text-sm xxxs:text-sm xs:mb-1 xxs:mb-1 xxxs:mb-1 md:mb-2 lg:mb-2">
            MINUTES
          </p>
        </div>
        <div>
          <p className="md:text-4xl lg:text-4xl xs:text-xl xxs:text-xl xxxs:text-xl font-light tracking-widest">
            {seconds}
          </p>
          <p className="text_color text-base xs:text-sm xxs:text-sm xxxs:text-sm xs:mb-1 xxs:mb-1 xxxs:mb-1 md:mb-2 lg:mb-2">
            SECONDS
          </p>
        </div>
      </div>
    </>
  );
};

function Home() {
  const { account, library } = useWeb3React();

  const triedToEagerConnect = useEagerConnect();

  const [confirmPurchaseModal, setConfirmPurchaseModal] =
    useState<boolean>(false);

  const isConnected = typeof account === "string" && !!library;

  return (
    <div>
      <Head>
        <title>KELP Private Sale</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main></main>
    </div>
  );
}

export default Home;
