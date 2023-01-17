import { useContractWrite, usePrepareContractWrite } from "wagmi";
import crowdSaleABI from "../contracts/CrowdSale.json";

const crowdSaleContractAddress = process.env
  .NEXT_PUBLIC_CROWD_SALE_ADDRESS as `0x${string}`;

export default function useBuyKelp(beneficiary: string) {
  const { config } = usePrepareContractWrite({
    address: crowdSaleContractAddress,
    abi: crowdSaleABI,
    functionName: "buyActiveSaleTokens",
    args: [beneficiary],
  });

  const contract = useContractWrite(config);

  return contract;
}
