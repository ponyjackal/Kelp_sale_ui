import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { utils } from "ethers";
import crowdSaleABI from "../contracts/CrowdSale.json";

const crowdSaleContractAddress = process.env
  .NEXT_PUBLIC_CROWD_SALE_ADDRESS as `0x${string}`;

export default function useBuyKelpBNB(beneficiary: string, busdAmount: string) {
  const { config } = usePrepareContractWrite({
    address: crowdSaleContractAddress,
    abi: crowdSaleABI,
    functionName: "buyActiveSaleTokensBUSD",
    args: [beneficiary],
    overrides: {
      value: utils.parseEther(busdAmount),
    },
  });

  const contract = useContractWrite(config);

  return contract;
}
