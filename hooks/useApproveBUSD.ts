import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { utils } from "ethers";
import erc20ABI from "../contracts/ERC20.json";
import { Address } from "../utils/types";

const BUSD_ADDRESS = process.env.NEXT_PUBLIC_BUSD_ADDRESS as Address;

const crowdSaleContractAddress = process.env
  .NEXT_PUBLIC_CROWD_SALE_ADDRESS as Address;

export default function useApproveBUSD(amount: string) {
  const { config } = usePrepareContractWrite({
    address: BUSD_ADDRESS,
    abi: erc20ABI,
    functionName: "approve",
    args: [crowdSaleContractAddress, utils.parseEther(amount)],
  });

  const contract = useContractWrite(config);

  return contract;
}
