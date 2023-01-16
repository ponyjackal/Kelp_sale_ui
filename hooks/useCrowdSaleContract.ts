import { useContract } from "wagmi";
import ABI from "../contracts/CrowdSale.json";

const crowdSaleContractAddress = process.env.CROWD_SALE_ADDRESS;

export default function useCrowdSaleContract() {
  const contract = useContract({
    address: crowdSaleContractAddress,
    abi: ABI,
  });

  return contract;
}
