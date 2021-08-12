import React, { useState, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
import { useAllHarvest } from 'hooks/useHarvest'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import UnlockButton from 'components/UnlockButton'
import FlexLayout from 'components/layout/Flex'
import FarmCard, { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import { Farm } from 'state/types'
import BigNumber from 'bignumber.js'
import isArchivedPid from 'utils/farmHelpers'
import { getAddress } from 'utils/addressHelpers'
import { useFarms, useGetApiPrices, usePriceCakeBusd } from 'state/hooks'
import { getFarmApr } from 'utils/apr'

const StyledFarmStakingCard = styled(Card)`
  background-image: url('/images/cake-bg.svg');
  background-repeat: no-repeat;
  background-position: top right;
  min-height: 376px;
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
    } catch (error) {
      // TODO: find a way to handle when the user rejects transaction or it fails
    } finally {
      setPendingTx(false)
    }
  }, [onReward])

  /* Add new code */
  const prices = useGetApiPrices()
  const cakePrice = usePriceCakeBusd()
  const { data: farmsLP } = useFarms()
  const activeFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier !== '0X' && !isArchivedPid(farm.pid))
  const farmsList = useCallback(
    (farmsToDisplay: Farm[]): FarmWithStakedValue[] => {
      const farmsToDisplayWithAPR: FarmWithStakedValue[] =  farmsToDisplay.map((farm) => {
        if (!farm.lpTotalInQuoteToken || !prices) {
          return farm
        }

        const quoteTokenPriceUsd = prices[getAddress(farm.quoteToken.address).toLowerCase()]
        const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(quoteTokenPriceUsd)
        const apr = getFarmApr(farm.poolWeight, cakePrice, totalLiquidity)

        return { ...farm, apr, liquidity: totalLiquidity }
      })
      return farmsToDisplayWithAPR
    },
    [cakePrice, prices]
  )

  const farmsStakedMemoized = useMemo(() => {
    return farmsList(activeFarms).slice(0, 2)
  }, [farmsList, activeFarms])

  const renderContent = (): JSX.Element => {
    return (
      <div>
        <FlexLayout>
          <FarmList>
            {farmsStakedMemoized.map((farm) => (
              <FarmCard key={farm.pid} farm={farm} cakePrice={cakePrice} account={account} removed />
            ))}
          </FarmList>
        </FlexLayout>
      </div>
    )
  }
  /* ===================== */
  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading scale="xl" mb="24px">
          {t('Top Projects')}
        </Heading>
        {renderContent()}
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
