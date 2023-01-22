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
  const options = ["BNB", "BUSD"];
  const [selectedCurrency, setSelectedCurrency] = useState<string>(options[0]);
  return (
    <header className="px-8 py-4 bg-gray-2">
      <nav className="flex justify-between items-center">
        <Link href="/" passHref>
          <Image src={"/kelp.png"} width={82} height={40} alt="logo" />
        </Link>

        <section className="flex justify-center items-baseline">
          {isConnected && (
            <div className="hidden sm:grid grid-cols-1 gap-4 mr-8">
              <TokenBalance tokenAddress={KELP_TOKEN_ADDRESS} />
            </div>
          )}
          {isConnected && (
            <Dropdown>
              <Dropdown.Toggle
                className="font-helvetica text-lg py-2 border-2 border-secondary rounded-lg"
                id="dropdown-currencies"
              >
                {selectedCurrency}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setSelectedCurrency(options[0])}>
                  {"BNB"}
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSelectedCurrency(options[1])}>
                  {"BUSD"}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
          <Account />
        </section>
      </nav>
    </header>
  );
};

export default Header;
