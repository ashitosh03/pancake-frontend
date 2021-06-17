import React from 'react'
import styled from 'styled-components'
import { Box, CardBody, Flex, Text, useMatchBreakpoints } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { useWeb3React } from '@web3-react/core'
import UnlockButton from 'components/UnlockButton'
import { useLacVault } from 'state/hooks'
import { Pool } from 'state/types'
import AprRow from '../PoolCard/AprRow'
import { StyledCard, StyledCardInner } from '../PoolCard/StyledCard'
import CardFooter from '../PoolCard/CardFooter'
import StyledCardHeader from '../PoolCard/StyledCardHeader'
import VaultCardActions from './VaultCardActions'
import UnstakingFeeCountdownRow from './UnstakingFeeCountdownRow'
import RecentLacProfitRow from './RecentCakeProfitRow'

const StyledCardBody = styled(CardBody)<{ isLoading: boolean }>`
  min-height: ${({ isLoading }) => (isLoading ? '0' : '254px')};
`

interface LacVaultProps {
  pool: Pool
  showStakedOnly: boolean
}

const LacVaultCard: React.FC<LacVaultProps> = ({ pool, showStakedOnly }) => {
  const { t } = useTranslation()
  const { isXl } = useMatchBreakpoints()
  const { account } = useWeb3React()
  const {
    userData: { userShares, isLoading: isVaultUserDataLoading },
    fees: { performanceFee },
  } = useLacVault()

  const accountHasSharesStaked = userShares && userShares.gt(0)
  const isLoading = !pool.userData || isVaultUserDataLoading
  const performanceFeeAsDecimal = performanceFee && performanceFee / 100

  if (showStakedOnly && !accountHasSharesStaked) {
    return null
  }

  return (
    <StyledCard isPromoted={{ isDesktop: isXl }}>
      <StyledCardInner>
        <StyledCardHeader
          isStaking={accountHasSharesStaked}
          isAutoVault
          earningTokenSymbol="CAKE"
          stakingTokenSymbol="CAKE"
        />
        <StyledCardBody isLoading={isLoading}>
          <AprRow pool={pool} performanceFee={performanceFeeAsDecimal} />
          <Box mt="24px">
            <RecentLacProfitRow />
          </Box>
          <Box mt="8px">
            <UnstakingFeeCountdownRow />
          </Box>
          <Flex mt="32px" flexDirection="column">
            {account ? (
              <VaultCardActions pool={pool} accountHasSharesStaked={accountHasSharesStaked} isLoading={isLoading} />
            ) : (
              <>
                <Text mb="10px" textTransform="uppercase" fontSize="12px" color="textSubtle" bold>
                  {t('Start earning')}
                </Text>
                <UnlockButton />
              </>
            )}
          </Flex>
        </StyledCardBody>
        <CardFooter pool={pool} account={account} />
      </StyledCardInner>
    </StyledCard>
  )
}

export default LacVaultCard
