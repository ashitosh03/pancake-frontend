import BigNumber from 'bignumber.js'
import { getLacAddress } from 'utils/addressHelpers'
import useTokenBalance from './useTokenBalance'

/**
 * A hook to check if a wallet's CAKE balance is at least the amount passed in
 */
const useHasLacBalance = (minimumBalance: BigNumber) => {
  const { balance: lacBalance } = useTokenBalance(getLacAddress())
  return lacBalance.gte(minimumBalance)
}

export default useHasLacBalance
