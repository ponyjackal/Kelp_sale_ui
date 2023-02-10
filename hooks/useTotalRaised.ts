import { useContractRead } from "wagmi";
import crowdSaleABI from "../contracts/CrowdSale.json";
import { Address } from "../utils/types";

const crowdSaleContractAddress = process.env
  .NEXT_PUBLIC_CROWD_SALE_ADDRESS as Address;

export default function useTotalRaised(type: string) {
  const contract = useContractRead({
    address: crowdSaleContractAddress,
    abi: crowdSaleABI,
    functionName: "totalSales",
    scopeKey: "totalSales",
    args: [type],
    watch: true,
  });

  return contract;
}
