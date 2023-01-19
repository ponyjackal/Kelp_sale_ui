import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Account from "./Account";
import { useAccount } from "wagmi";
import ETHBalance from "./ETHBalance";
import TokenBalance from "./TokenBalance";
import { KELP_TOKEN_ADDRESS } from "../utils/constants";

const Header = () => {
  const { address, isConnected } = useAccount();

  return (
    <header className="px-8 py-4 bg-gray-2">
      <nav className="flex justify-between items-center">
        <Link href="/" passHref>
          <Image src={"/kelp.png"} width={82} height={40} alt="logo" />
        </Link>

        <section className="flex justify-center items-baseline">
          {isConnected && (
            <div className="hidden sm:grid grid-cols-2 gap-4 mr-8">
              <ETHBalance />

              <TokenBalance tokenAddress={KELP_TOKEN_ADDRESS} />
            </div>
          )}

          <Account />
        </section>
      </nav>
    </header>
  );
};

export default Header;
