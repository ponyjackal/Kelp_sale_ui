import { useMemo } from "react";
import { ProgressBar } from "react-bootstrap";
import { utils, BigNumber } from "ethers";
import { useContractReads } from "wagmi";
import crowdSaleABI from "../contracts/CrowdSale.json";

const crowdSaleContractAddress = process.env
  .NEXT_PUBLIC_CROWD_SALE_ADDRESS as `0x${string}`;

const crowdSaleContract = {
  address: crowdSaleContractAddress,
  abi: crowdSaleABI,
};

const TotalRaised = () => {
  const { data } = useContractReads({
    contracts: [
      {
        ...crowdSaleContract,
        functionName: "weiRaised",
      },
      {
        ...crowdSaleContract,
        functionName: "getBNBPrice",
      },
    ],
    watch: true,
  });

  const totalWeiRaised = (data[0] as BigNumber) ?? 0;
  const bnbPrice = (data[1] as BigNumber) ?? 0;

  const totalRaised = useMemo(() => {
    if (!totalWeiRaised || !bnbPrice) {
      return 0;
    }

    return utils.formatEther(totalWeiRaised.mul(bnbPrice));
  }, [totalWeiRaised, bnbPrice]);

  return (
    <div className="text-left mt-10">
      <p className="text-gray-1 text-sm sm:text-lg mb-1">TOTAL RAISED</p>
      <p className="text-primary font-bold text-lg sm:text-2xl mb-2.5 md:mb-6">
        $ {totalRaised ?? 0}
      </p>
      <div className="relative progress-container">
        <ProgressBar now={10} />
      </div>
      <p className="text-base text-right text-gray-1 font-medium mt-3">
        $1,000,000 HARD CAP
      </p>
    </div>
  );
};

export default TotalRaised;
