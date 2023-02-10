import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { utils } from "ethers";
import crowdSaleABI from "../contracts/CrowdSale.json";
import { Address } from "../utils/types";

const crowdSaleContractAddress = process.env
  .NEXT_PUBLIC_CROWD_SALE_ADDRESS as Address;

export default function useBuyKelpBUSD(
  beneficiary: string,
  busdAmount: string
) {
  const { config } = usePrepareContractWrite({
    address: crowdSaleContractAddress,
    abi: crowdSaleABI,
    functionName: "buyActiveSaleTokensBUSD",
    args: [beneficiary, utils.parseEther(busdAmount)],
  });

  const contract = useContractWrite(config);

  return contract;
}
