import { useMemo } from "react";
import { ProgressBar } from "react-bootstrap";
import { utils, BigNumber } from "ethers";
import useWeiRaised from "../hooks/useWeiRaised";

const TotalRaised = () => {
  const { data: totalWeiRaisedRaw } = useWeiRaised();

  const totalRaised = useMemo(() => {
    if (!totalWeiRaisedRaw) {
      return 0;
    }

    const totalWeiRaised = utils.formatEther(totalWeiRaisedRaw as BigNumber);

    return totalWeiRaised.slice(0, totalWeiRaised.indexOf(".") + 6);
  }, [totalWeiRaisedRaw]);

  return (
    <div className="text-left mt-10">
      <p className="text-gray-1 text-sm sm:text-lg mb-1">TOTAL RAISED</p>
      <p className="text-green-1 font-bold text-lg sm:text-2xl mb-2.5 md:mb-6">
        {totalRaised ?? 0} BNB
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
