import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Account from "./Account";
import { useAccount } from "wagmi";
import Dropdown from "react-bootstrap/Dropdown";
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
            <div className="hidden sm:grid grid-cols-1 gap-4 token-balance btn-header">
              <TokenBalance tokenAddress={KELP_TOKEN_ADDRESS} />
            </div>
          )}
          <Account className="btn-header" />
        </section>
      </nav>
    </header>
  );
};

export default Header;
