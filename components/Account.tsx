import { useState } from "react";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount, useEnsName } from "wagmi";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "./Button";
import { shortenHex } from "../util";

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const { open, close } = useWeb3Modal();
  const { address, isConnected } = useAccount();

  const { data, isError, isLoading } = useEnsName();

  const onOpen = async () => {
    setLoading(true);
    await open();
    setLoading(false);
  };

  const onClose = async () => {
    setLoading(true);
    await close();
    setLoading(false);
  };

  return (
    <>
      {isConnected && address ? (
        <Dropdown>
          <Dropdown.Toggle
            className="toggle-btn text-green-1 font-helvetica text-lg px-4 py-2 border-2 border-secondary rounded-lg"
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
