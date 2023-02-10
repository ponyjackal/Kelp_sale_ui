import { useContractRead } from "wagmi";
import { BigNumber } from "ethers";
import crowdSaleABI from "../contracts/CrowdSale.json";
import { Address } from "../utils/types";

const crowdSaleContractAddress = process.env
  .NEXT_PUBLIC_CROWD_SALE_ADDRESS as Address;

export type SaleInfo =
  | {
      limitPerAccount: BigNumber;
      paused: boolean;
      rate: BigNumber;
      startTime: BigNumber;
      totalLimit: BigNumber;
    }
  | undefined;

export default function useSales(type: string) {
  const { data, isLoading, error } = useContractRead({
    address: crowdSaleContractAddress,
    abi: crowdSaleABI,
    functionName: "sales",
    scopeKey: "sales",
    args: [type],
    watch: true,
  });

  const saleInfo = data as SaleInfo;

  return {
    data: saleInfo,
    isLoading,
    error,
  };
}
