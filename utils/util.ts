import type { BigNumberish } from "@ethersproject/bignumber";
import { formatUnits } from "@ethersproject/units";
import { utils, providers } from "ethers";
import crowdSaleABI from "../contracts/CrowdSale.json";
import { Address } from "./types";
import { BSC_MAINNET_RPC_URL } from "./constants";

export function shortenHex(hex: string, length = 4) {
  return `${hex.substring(0, length + 2)}…${hex.substring(
    hex.length - length
  )}`;
}

export const parseBalance = (
  value: BigNumberish,
  decimals = 18,
  decimalsToDisplay = 8
) => parseFloat(formatUnits(value, decimals)).toFixed(decimalsToDisplay);

const crowdSaleContractAddress = process.env
  .NEXT_PUBLIC_CROWD_SALE_ADDRESS as Address;

const provider = new providers.JsonRpcProvider(BSC_MAINNET_RPC_URL);

export const getFixedAmount = (
  amount: string | number,
  dPlaces: number = 6
) => {
  let amountP = amount;
  if (typeof amountP !== "number") {
    amountP = Number(amountP);
  }

  if (amountP) {
    return amountP?.toFixed(amount > 10 ? 2 : dPlaces);
  } else {
    return "0.00";
  }
};

export const buyKelpTokenGasFee = async (
  bnbPrice: string,
  value: string,
  address?: string
) => {
  try {
    const abi = crowdSaleABI.map((method: any) => ({ ...method }));
    const iMainContract = new utils.Interface(abi);
    const data = iMainContract.encodeFunctionData("buyActiveSaleTokensBNB", [
      `${address}`,
    ]);

    const gasPrice = await provider.getGasPrice();

    const gasLimit = await provider.estimateGas({
      to: crowdSaleContractAddress,
      from: address,
      data,
      value: utils.parseEther(value)._hex,
    });

    const ceilGasLimit = Math.ceil(gasLimit.toNumber());

    const networkFeeInWei = gasPrice.toNumber() * ceilGasLimit;
    const networkFee = networkFeeInWei / 1e18;

    const networkFeeFiat = networkFee * Number(bnbPrice);
    return {
      networkFeeFiat: getFixedAmount(networkFeeFiat, 2),
      networkFee,
      gasLimit: ceilGasLimit,
      gasPrice: gasPrice.toNumber(),
    };
  } catch (error) {
    throw error;
  }
};

export const approveKelpTokenGasFee = async (
  bnbPrice: string,
  value: string,
  address?: string
) => {
  try {
    const abi = crowdSaleABI.map((method: any) => ({ ...method }));
    const iMainContract = new utils.Interface(abi);
    const data = iMainContract.encodeFunctionData("buyActiveSaleTokensBNB", [
      `${address}`,
    ]);

    const gasPrice = await provider.getGasPrice();

    const gasLimit = await provider.estimateGas({
      to: crowdSaleContractAddress,
      from: address,
      data,
      value: utils.parseEther(value)._hex,
    });

    const ceilGasLimit = Math.ceil(gasLimit.toNumber());

    const networkFeeInWei = gasPrice.toNumber() * ceilGasLimit;
    const networkFee = networkFeeInWei / 1e18;

    const networkFeeFiat = networkFee * Number(bnbPrice);
    return {
      networkFeeFiat: getFixedAmount(networkFeeFiat, 2),
      networkFee,
      gasLimit: ceilGasLimit,
      gasPrice: gasPrice.toNumber(),
    };
  } catch (error) {
    throw error;
  }
};
