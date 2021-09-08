import React from 'react'
import { Card, CardBody, Heading, Text } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import { useTranslation } from 'contexts/Localization'
import { getCakeAddress } from 'utils/addressHelpers'
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

const GpnStats = () => {
  const { t } = useTranslation()
  const totalSupply = useTotalSupply()
  const burnedBalance = getBalanceNumber(useBurnedBalance(getCakeAddress()))
  const cakeSupply = totalSupply ? getBalanceNumber(totalSupply) - burnedBalance : 0

  return (
    <StyledGpnStats>
      <CardBody>
        <Heading scale="xxl" mb="28px">
          {t('GPN Stats')}
        </Heading>
        <Row>
          <Text fontSize="14px">{t('Market Cap')}</Text>
          {cakeSupply && <CardValue fontSize="14px" value={cakeSupply} prefix="$" />}
        </Row>
        <Row>
          <Text fontSize="14px">{t('Total Minted')}</Text>
          <CardValue fontSize="14px" decimals={0} value={256351414} />
        </Row>
        <Row>
          <Text fontSize="14px">{t('Total Burned')}</Text>
          <CardValue fontSize="14px" decimals={0} value={burnedBalance} />
        </Row>
        <Row>
          <Text fontSize="14px">{t('Total Locked Rewards')}</Text>
          <CardValue fontSize="14px" decimals={0} value={41686155} />
        </Row>
        <Row>
          <Text fontSize="14px">{t('Circulating Supply')}</Text>
          {cakeSupply && <CardValue fontSize="14px" value={cakeSupply} />}
        </Row>
        <Row>
          <Text fontSize="14px">{t('Max Tx Amount')}</Text>
          <CardValue fontSize="14px" decimals={0} value={205082} />
        </Row>
        <Row>
          <Text fontSize="14px">{t('New GPN/Block')}</Text>
          <CardValue fontSize="14px" decimals={0} value={50} />
        </Row>
        <Row>
          <Text fontSize="14px">{t('Transfer Tax')}</Text>
          <CardValue fontSize="14px" decimals={0} value={2.2} postfix="%" />
        </Row>
      </CardBody>
    </StyledGpnStats>
  )
}

export default GpnStats