import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import Link from "next/link";
import Image from "next/image";
import useEagerConnect from "../hooks/useEagerConnect";
import Account from "./Account";
import ETHBalance from "./ETHBalance";
import TokenBalance from "./TokenBalance";

const Header = () => {
  const { account, library } = useWeb3React();

  const triedToEagerConnect = useEagerConnect();

  const isConnected = typeof account === "string" && !!library;

  return (
    <header className="px-8 py-4">
      <nav className="flex justify-between">
        <Link href="/" passHref>
          <Image src={"/kelp.png"} width={82} height={40} alt="logo" />
        </Link>

        <section className="flex">
          {isConnected && (
            <div className="grid grid-cols-2 gap-4 mr-8">
              <ETHBalance />

              <TokenBalance
                tokenAddress={process.env.KELP_TOKEN_ADDRESS}
                symbol="KELP"
              />
            </div>
          )}

          <Account triedToEagerConnect={triedToEagerConnect} />
        </section>
      </nav>
    </header>
  );
};

export default Header;
