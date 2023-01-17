import { useMemo } from "react";
import { ProgressBar } from "react-bootstrap";
import { utils, BigNumber } from "ethers";
import useBNBPrice from "../hooks/useBNBPrice";
import useWeiRaised from "../hooks/useWeiRaised";

const TotalRaised = () => {
  const { data: bnbPriceRaw } = useBNBPrice();
  const { data: totalWeiRaisedRaw } = useWeiRaised();

  const totalRaised = useMemo(() => {
    if (!bnbPriceRaw || !totalWeiRaisedRaw) {
      return 0;
    }

    const bnbPrice = bnbPriceRaw as BigNumber;
    const totalWeiRaised = totalWeiRaisedRaw as BigNumber;

    return utils.formatEther(totalWeiRaised.mul(bnbPrice));
  }, [totalWeiRaisedRaw, bnbPriceRaw]);

  return (
    <div className="text-left mt-10">
      <p className="text-gray-1 text-sm sm:text-lg mb-1">TOTAL RAISED</p>
      <p className="text-green-1 font-bold text-lg sm:text-2xl mb-2.5 md:mb-6">
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
