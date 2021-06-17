import React from 'react'
import { Card, CardBody, Heading, Text } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import { useTranslation } from 'contexts/Localization'
import { getLacAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'

const StyledLacStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const LacStats = () => {
  const { t } = useTranslation()
  const totalSupply = useTotalSupply()
  const burnedBalance = getBalanceNumber(useBurnedBalance(getLacAddress()))
  const lacSupply = totalSupply ? getBalanceNumber(totalSupply) - burnedBalance : 0

  return (
    <StyledLacStats>
      <CardBody>
        <Heading scale="xl" mb="24px">
          {t('Lac Stats')}
        </Heading>
        <Row>
          <Text fontSize="14px">{t('Total CAKE Supply')}</Text>
          {lacSupply && <CardValue fontSize="14px" value={lacSupply} />}
        </Row>
        <Row>
          <Text fontSize="14px">{t('Total CAKE Burned')}</Text>
          <CardValue fontSize="14px" decimals={0} value={burnedBalance} />
        </Row>
        <Row>
          <Text fontSize="14px">{t('New CAKE/block')}</Text>
          <CardValue fontSize="14px" decimals={0} value={20} />
        </Row>
      </CardBody>
    </StyledLacStats>
  )
}

export default LacStats
