import React from 'react'
import { Flex, Text } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
import { useLacVault, usePriceLacBusd } from 'state/hooks'
import { getLacVaultEarnings } from 'views/Pools/helpers'
import RecentCakeProfitBalance from './RecentCakeProfitBalance'

const RecentCakeProfitCountdownRow = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const {
    pricePerFullShare,
    userData: { lacAtLastUserAction, userShares, lastUserActionTime },
  } = useLacVault()
  const lacPriceBusd = usePriceLacBusd()
  const { hasAutoEarnings, autoLacToDisplay, autoUsdToDisplay } = getLacVaultEarnings(
    account,
    lacAtLastUserAction,
    userShares,
    pricePerFullShare,
    lacPriceBusd.toNumber(),
  )

  const lastActionInMs = lastUserActionTime && parseInt(lastUserActionTime) * 1000
  const dateTimeLastAction = new Date(lastActionInMs)
  const dateStringToDisplay = dateTimeLastAction.toLocaleString()

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Text fontSize="14px">{`${t('Recent CAKE profit')}:`}</Text>
      {hasAutoEarnings && (
        <RecentCakeProfitBalance
          lacToDisplay={autoLacToDisplay}
          dollarValueToDisplay={autoUsdToDisplay}
          dateStringToDisplay={dateStringToDisplay}
        />
      )}
    </Flex>
  )
}

export default RecentCakeProfitCountdownRow
