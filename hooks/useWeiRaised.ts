import { useContractRead } from "wagmi";
import crowdSaleABI from "../contracts/CrowdSale.json";

const crowdSaleContractAddress = process.env
  .CROWD_SALE_ADDRESS as `0x${string}`;

export default function useWeiRaised() {
  const contract = useContractRead({
    address: crowdSaleContractAddress,
    abi: crowdSaleABI,
    functionName: "weiRaised",
    chainId: 56,
    // watch: true,
    onSettled(data, error) {
      console.log("Settled", { data, error });
    },
  });

  return contract;
}
