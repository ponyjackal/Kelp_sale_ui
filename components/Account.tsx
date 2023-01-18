import { useState } from "react";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount, useEnsName } from "wagmi";
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
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          {data || `${shortenHex(address, 4)}`}
        </Button>
      ) : (
        <Button variant="primary" onClick={onOpen} disabled={loading}>
          {loading ? "Loading..." : "Connect Wallet"}
        </Button>
      )}
    </>
  );
}
