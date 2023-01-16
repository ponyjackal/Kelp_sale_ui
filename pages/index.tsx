import { useState, FunctionComponent } from "react";
import { useWeb3React } from "@web3-react/core";
import { Container, ProgressBar } from "react-bootstrap";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Account from "../components/Account";
import ETHBalance from "../components/ETHBalance";
import TokenBalance from "../components/TokenBalance";
import useEagerConnect from "../hooks/useEagerConnect";
import Header from "../components/Header";
import Countdown from "../components/CountDown";

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

      <main className="px-24 py-16">
        <h1 className="text-gray-1 text-left font-bold leading-6 xs:text-2xl xxs:text-2xl xxxs:text-2xl md:text-3xl lg:text-3xl">
          PRIVATE SALE
        </h1>
        <Countdown date={"2023-01-31T14:48:00.000+09:00"} />
      </main>
    </div>
  );
}

export default Home;
