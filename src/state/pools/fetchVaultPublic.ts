import BigNumber from 'bignumber.js'
import { convertSharesToLac } from 'views/Pools/helpers'
import { getLacVaultContract } from 'utils/contractHelpers'
import makeBatchRequest from 'utils/makeBatchRequest'

const lacVaultContract = getLacVaultContract()

export const fetchPublicVaultData = async () => {
  try {
    const [sharePrice, shares, estimatedLacBountyReward, totalPendingLacHarvest] = await makeBatchRequest([
      lacVaultContract.methods.getPricePerFullShare().call,
      lacVaultContract.methods.totalShares().call,
      lacVaultContract.methods.calculateHarvestLacRewards().call,
      lacVaultContract.methods.calculateTotalPendingLacRewards().call,
    ])
    const totalSharesAsBigNumber = new BigNumber(shares as string)
    const sharePriceAsBigNumber = new BigNumber(sharePrice as string)
    const totalLacInVaultEstimate = convertSharesToLac(totalSharesAsBigNumber, sharePriceAsBigNumber)
    return {
      totalShares: totalSharesAsBigNumber.toJSON(),
      pricePerFullShare: sharePriceAsBigNumber.toJSON(),
      totalLacInVault: totalLacInVaultEstimate.lacAsBigNumber.toJSON(),
      estimatedLacBountyReward: new BigNumber(estimatedLacBountyReward as string).toJSON(),
      totalPendingLacHarvest: new BigNumber(totalPendingLacHarvest as string).toJSON(),
    }
  } catch (error) {
    return {
      totalShares: null,
      pricePerFullShare: null,
      totalLacInVault: null,
      estimatedLacBountyReward: null,
      totalPendingLacHarvest: null,
    }
  }
}

export const fetchVaultFees = async () => {
  try {
    const [performanceFee, callFee, withdrawalFee, withdrawalFeePeriod] = await makeBatchRequest([
      lacVaultContract.methods.performanceFee().call,
      lacVaultContract.methods.callFee().call,
      lacVaultContract.methods.withdrawFee().call,
      lacVaultContract.methods.withdrawFeePeriod().call,
    ])
    return {
      performanceFee: parseInt(performanceFee as string, 10),
      callFee: parseInt(callFee as string, 10),
      withdrawalFee: parseInt(withdrawalFee as string, 10),
      withdrawalFeePeriod: parseInt(withdrawalFeePeriod as string, 10),
    }
  } catch (error) {
    return {
      performanceFee: null,
      callFee: null,
      withdrawalFee: null,
      withdrawalFeePeriod: null,
    }
  }
}

export default fetchPublicVaultData
