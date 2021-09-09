import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
import { useAllHarvest } from 'hooks/useHarvest'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import UnlockButton from 'components/UnlockButton'
import FlexLayout from 'components/Layout/Flex'
import FarmCard, { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import { Farm } from 'state/types'
import BigNumber from 'bignumber.js'
import isArchivedPid from 'utils/farmHelpers'
import { useFarms, usePriceCakeBusd } from 'state/farms/hooks'
import { getFarmApr } from 'utils/apr'
import CardValue from './CardValue'

const StyledFarmStakingCard = styled(Card)`
  background-image: url('/images/cake-bg.svg');
  background-repeat: no-repeat;
  background-position: top right;
  min-height: 376px;
`
const Block = styled.div`
  margin-bottom: 16px;
`

const CardImage = styled.img`
  margin-bottom: 16px;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
`


const Actions = styled.div`
  margin-top: 24px;
`
const FarmList = styled.div`
  > div {
    min-width: auto;
    max-width: calc(50% - 16px);
    margin: 0 8px;
  }
  display: flex;
  min-width: 100%;
  max-width: 100%;
  width: 100%;
  margin: 0;
`

const FarmedStakingCard = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const farmsWithBalance = useFarmsWithBalance()
  const balancesWithValue = farmsWithBalance.filter((balanceType) => balanceType.balance.toNumber() > 0)

  const { onReward } = useAllHarvest(balancesWithValue.map((farmWithBalance) => farmWithBalance.pid))

  const harvestAllFarms = useCallback(async () => {
    setPendingTx(true)
    try {
      await onReward()
    } catch (error:  any) {
      // TODO: find a way to handle when the user rejects transaction or it fails
    } finally {
      setPendingTx(false)
    }
  }, [onReward])
  
  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading scale="xl" mb="24px">
          {t('Farms & Staking')}
         </Heading>
        <CardImage src="/images/cake.svg" alt="cake logo" width={64} height={64} />
        <Block>
          <Label>{t('CAKE to Harvest')}:</Label>
          <CardValue fontSize="14px" decimals={0} value={256351414} />

        </Block>
        <Block>
          <Label>{t('CAKE in Wallet')}:</Label>
          <CardValue fontSize="14px" decimals={0} value={256351414} />
          
        </Block>
        <Actions>
          {account ? (
            <Button
              id="harvest-all"
              disabled={balancesWithValue.length <= 0 || pendingTx}
              onClick={harvestAllFarms}
              width="100%"
            >
              {pendingTx
                ? t('Collecting CAKE')
                : t('Harvest all (%count%)', {
                    count: balancesWithValue.length,
                  })}
            </Button>
          ) : (
            <UnlockButton width="100%" />
          )}
        </Actions>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default FarmedStakingCard