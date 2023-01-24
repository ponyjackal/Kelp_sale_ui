import { useState } from "react";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount, useEnsName } from "wagmi";
import { disconnect } from "@wagmi/core";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "./Button";
import { shortenHex } from "../util";

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
            <Dropdown.Item onClick={onClose}>
              {loading ? "Disconnecting" : "Disconnect"}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Button
          id="connect-wallet"
          className="btn"
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
