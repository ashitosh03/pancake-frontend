import React from 'react'
import { Text } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import useTokenBalance from 'hooks/useTokenBalance'
import { useTranslation } from 'contexts/Localization'
import { getLacAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePriceLacBusd } from 'state/hooks'
import { BigNumber } from 'bignumber.js'
import CardValue from './CardValue'
import CardBusdValue from './CardBusdValue'

const LacWalletBalance = () => {
  const { t } = useTranslation()
  const { balance: lacBalance } = useTokenBalance(getLacAddress())
  const lacPriceBusd = usePriceLacBusd()
  const busdBalance = new BigNumber(getBalanceNumber(lacBalance)).multipliedBy(lacPriceBusd).toNumber()
  const { account } = useWeb3React()

  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '54px' }}>
        {t('Locked')}
      </Text>
    )
  }

  return (
    <>
      <CardValue value={getBalanceNumber(lacBalance)} decimals={4} fontSize="24px" lineHeight="36px" />
      {lacPriceBusd.gt(0) ? <CardBusdValue value={busdBalance} /> : <br />}
    </>
  )
}

export default LacWalletBalance
