import { useMemo } from "react";
import { utils } from "ethers";
import useSales from "./useSales";
import { SALE_TYPE } from "../utils/constants";

const useKelpPrice = () => {
  const { data: saleInfo, isLoading, error } = useSales(SALE_TYPE);

  const kelpPrice = useMemo(() => {
    if (!saleInfo) {
      return "0.0";
    }

    const price = saleInfo.rate;
    const priceStr = utils.formatEther(price);

    return priceStr.slice(0, priceStr.indexOf(".") + 6);
  }, [saleInfo]);

  return {
    kelpPrice,
    isLoading,
    error,
  };
};

export default useKelpPrice;
