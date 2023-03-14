import { useState } from "react";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount, useEnsName } from "wagmi";
import { disconnect } from "@wagmi/core";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "./Button";
import { shortenHex } from "../utils/util";
import {
  KELP_TOKEN_ADDRESS,
  KELP_TOKEN_SYMBOL,
  KELP_TOKEN_DECIMAL,
  KELP_TOKEN_IMAGE,
} from "../utils/constants";

type DropDownToggleProps = {
  className?: string;
};

export default function HomePage({ className }: DropDownToggleProps) {
  const [loading, setLoading] = useState(false);
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();

  const { data, isError, isLoading } = useEnsName();

  const onOpen = async () => {
    setLoading(true);
    await open();
    setLoading(false);
  };

  const onClose = async () => {
    setLoading(true);
    await disconnect();
    setLoading(false);
  };

  const addKelpToWallet = async () => {
    if (!window.ethereum) {
      return;
    }

    await window.ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: KELP_TOKEN_ADDRESS,
          symbol: KELP_TOKEN_SYMBOL,
          decimals: KELP_TOKEN_DECIMAL,
          image: KELP_TOKEN_IMAGE,
        },
      },
    });
  };

  return (
    <>
      {isConnected && address ? (
        <Dropdown>
          <Dropdown.Toggle
            className={`toggle-btn text-green-1 font-helvetica text-lg py-2 rounded-lg btn-header ${className}`}
            id="dropdown-basic"
          >
            {data || `${shortenHex(address, 4)}`}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={addKelpToWallet}>
              Import Kelp to wallet
            </Dropdown.Item>
            <Dropdown.Item onClick={onClose}>
              {loading ? "Disconnecting" : "Disconnect"}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Button
          id="connect-wallet"
          className="bg-green-1 hover:bg-green-2 text-white font-helvetica text-lg py-2 xxxs:px-3 xxs:px-11 border-2 border-secondary rounded-lg"
          variant="primary"
          onClick={onOpen}
          disabled={loading}
        >
          {loading ? "Loading..." : "Connect Wallet"}
        </Button>
      )}
    </>
  );
}
