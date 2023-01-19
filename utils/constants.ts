import { BigNumber } from "ethers";
import { Address } from "./types";

export const SALE_TYPE = process.env.NEXT_PUBLIC_SALE_TYPE ?? "0";
export const KELP_TOKEN_ADDRESS = process.env
  .NEXT_PUBLIC_KELP_TOKEN_ADDRESS as Address;
export const DECIMAL: BigNumber = BigNumber.from(10).pow(18);
