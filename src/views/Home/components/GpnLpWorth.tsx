import React from 'react'
import { Card, CardBody, Heading, Text } from '@pancakeswap/uikit'
import styled from 'styled-components'
// import { getBalanceNumber } from 'utils/formatBalance'
// import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import { useTranslation } from 'contexts/Localization'
// import { getCakeAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'

const StyledGpnStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  width: calc(50% - 8px); 
  float: left; 
  margin: 0 4px;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const GpnLpWorth = () => {
  const { t } = useTranslation()
  // const totalSupply = useTotalSupply()
  // const burnedBalance = getBalanceNumber(useBurnedBalance(getCakeAddress()))
  // const cakeSupply = totalSupply ? getBalanceNumber(totalSupply) - burnedBalance : 0

  return (
    <StyledGpnStats>
      <CardBody>
        <Heading scale="lg" mb="28px">
          {t('GPN LP Worth')}
        </Heading>
        <Row>
          <Text fontSize="14px">{t('GPN-BNB')}</Text>
          <CardValue fontSize="14px" decimals={0} value={6.446}  prefix="$" />
        </Row>
        <Row>
          <Text fontSize="14px">{t('GPN-BUSD')}</Text>
          <CardValue fontSize="14px" decimals={0} value={0.331}  prefix="$" />
        </Row>
        <Row>
          <Text fontSize="14px">{t('GPN-GVE')}</Text>
          <CardValue fontSize="14px" decimals={0} value={4.561}  prefix="$" />
        </Row>
      </CardBody>
    </StyledGpnStats>
  )
}

export default GpnLpWorth