import { useContractRead } from "wagmi";
import crowdSaleABI from "../contracts/CrowdSale.json";

const crowdSaleContractAddress = process.env
  .NEXT_PUBLIC_CROWD_SALE_ADDRESS as `0x${string}`;

export default function useWeiRaised() {
  const contract = useContractRead({
    address: crowdSaleContractAddress,
    abi: crowdSaleABI,
    functionName: "weiRaised",
    scopeKey: "weiRaised",
    watch: true,
  });

  return contract;
}
