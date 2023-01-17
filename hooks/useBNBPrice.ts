import { useContractRead } from "wagmi";
import crowdSaleABI from "../contracts/CrowdSale.json";

const crowdSaleContractAddress = process.env
  .NEXT_PUBLIC_CROWD_SALE_ADDRESS as `0x${string}`;

export default function useBNBPrice() {
  const contract = useContractRead({
    address: crowdSaleContractAddress,
    abi: crowdSaleABI,
    functionName: "getBNBPrice",
    scopeKey: "getBNBPrice",
    watch: true,
  });

  return contract;
}
