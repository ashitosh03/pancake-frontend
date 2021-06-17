import { usePriceLacBusd } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalRewards } from './useTickets'

const useLotteryTotalPrizesUsd = () => {
  const totalRewards = useTotalRewards()
  const totalLac = getBalanceNumber(totalRewards)
  const lacPriceBusd = usePriceLacBusd()

  return totalLac * lacPriceBusd.toNumber()
}

export default useLotteryTotalPrizesUsd
