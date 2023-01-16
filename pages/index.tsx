import { useState } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Countdown from "../components/CountDown";
import TotalRaised from "../components/TotalRaised";
import Button from "../components/Button";

function Home() {
  return (
    <div>
      <Head>
        <title>KELP Private Sale</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="px-24 py-16">
        <section>
          <h1 className="text-gray-1 text-left font-bold leading-6 xs:text-2xl xxs:text-2xl xxxs:text-2xl md:text-3xl lg:text-3xl">
            PRIVATE SALE
          </h1>
        </section>

        <Countdown date={"2023-01-31T14:48:00.000+09:00"} />

        <TotalRaised />

        <div className="flex justify-center items-center">
          <Button
            className="font-bold text-2xl"
            onClick={() => console.log("Buy Kelp")}
          >
            Buy Kelp
          </Button>
        </div>
      </main>
    </div>
  );
}

export default Home;
