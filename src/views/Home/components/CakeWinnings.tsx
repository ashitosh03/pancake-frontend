import React from 'react'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePriceLacBusd } from 'state/hooks'
import { Text } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { BigNumber } from 'bignumber.js'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import CardValue from './CardValue'
import CardBusdValue from './CardBusdValue'

const Block = styled.div`
  margin-bottom: 24px;
`

interface LacWinningsProps {
  claimAmount: BigNumber
}

const LacWinnings: React.FC<LacWinningsProps> = ({ claimAmount }) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const lacAmount = getBalanceNumber(claimAmount)
  const lacPriceBusd = usePriceLacBusd()
  const claimAmountBusd = new BigNumber(lacAmount).multipliedBy(lacPriceBusd).toNumber()

  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '76px' }}>
        {t('Locked')}
      </Text>
    )
  }

  return (
    <Block>
      <CardValue value={lacAmount} lineHeight="1.5" />
      {lacPriceBusd.gt(0) && <CardBusdValue value={claimAmountBusd} decimals={2} />}
    </Block>
  )
}

export default LacWinnings
