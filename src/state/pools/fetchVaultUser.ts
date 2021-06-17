import BigNumber from 'bignumber.js'
import { getLacVaultContract } from 'utils/contractHelpers'

const lacVaultContract = getLacVaultContract()

const fetchVaultUser = async (account: string) => {
  try {
    const userContractResponse = await lacVaultContract.methods.userInfo(account).call()
    return {
      isLoading: false,
      userShares: new BigNumber(userContractResponse.shares).toJSON(),
      lastDepositedTime: userContractResponse.lastDepositedTime as string,
      lastUserActionTime: userContractResponse.lastUserActionTime as string,
      lacAtLastUserAction: new BigNumber(userContractResponse.lacAtLastUserAction).toJSON(),
    }
  } catch (error) {
    return {
      isLoading: true,
      userShares: null,
      lastDepositedTime: null,
      lastUserActionTime: null,
      lacAtLastUserAction: null,
    }
  }
}

export default fetchVaultUser
