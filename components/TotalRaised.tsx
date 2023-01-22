import { useMemo } from "react";
import { ProgressBar } from "react-bootstrap";
import { utils, BigNumber, constants } from "ethers";
import useTotalRaised from "../hooks/useTotalRaised";
import useSales from "../hooks/useSales";
import useKelpPrice from "../hooks/useKelpPrice";
import { SALE_TYPE, DECIMAL } from "../utils/constants";

const TotalRaised = () => {
  const { data: totalRaisedRaw } = useTotalRaised(SALE_TYPE);
  const { data: saleInfo } = useSales(SALE_TYPE);
  const { kelpPrice } = useKelpPrice();

  const totalRaised = useMemo(() => {
    if (!totalRaisedRaw || !kelpPrice) {
      return "0.0";
    }

    const totalRaisedBN = totalRaisedRaw as BigNumber;

    const totalRaisedStr = utils.formatEther(
      totalRaisedBN.mul(utils.parseEther(kelpPrice)).div(DECIMAL)
    );

    return totalRaisedStr.slice(0, totalRaisedStr.indexOf(".") + 6);
  }, [totalRaisedRaw, kelpPrice]);

  const totalLimit = useMemo(() => {
    if (!saleInfo) {
      return "0.0";
    }

    const totalLimitRaw = saleInfo.totalLimit;
    const totalLimitStr = utils.formatEther(
      totalLimitRaw.mul(utils.parseEther(kelpPrice)).div(DECIMAL)
    );

    return totalLimitStr.slice(0, totalLimitStr.indexOf(".") + 6);
  }, [saleInfo, kelpPrice]);

  const percentage =
    totalLimit !== "0.0"
      ? Math.floor(parseFloat(totalRaised) / parseFloat(totalLimit))
      : 0;

  return (
    <div className="text-left mt-10">
      <p className="text-gray-1 text-sm sm:text-lg mb-1">TOTAL RAISED</p>

      <div className="relative progress-container">
        <ProgressBar now={percentage} />
      </div>
      <p className="text-green-1 inline-block font-bold text-left text-lg sm:text-2xl mb-2.5 md:mb-6">
        $ {totalRaised ?? 0}
      </p>
      <p className="text-green-1 inline-block font-bold text-lg sm:text-2xl mb-2.5 md:mb-6 inline-block text-right">
        ${totalLimit}
      </p>
    </div>
  );
};

export default TotalRaised;
