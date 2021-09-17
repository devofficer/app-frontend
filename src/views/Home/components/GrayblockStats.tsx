import React from 'react'
import { Card, CardBody, Heading, Text } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import { useTranslation } from 'contexts/Localization'
import { getCakeAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'

const StyledGrayblockStats = styled(Card)`
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

const GrayblockStats = () => {
  const { t } = useTranslation()
  const totalSupply = useTotalSupply()
  const burnedBalance = getBalanceNumber(useBurnedBalance(getCakeAddress()))
  const cakeSupply = totalSupply ? getBalanceNumber(totalSupply) - burnedBalance : 0

  return (
    <StyledGrayblockStats>
      <CardBody>
        <Heading scale="lg" mb="28px">
          {t('Grayblock Stats')}
        </Heading>
        <Row>
          <Text fontSize="14px">{t('MWs being Serve')}</Text>
          <CardValue fontSize="14px" decimals={0} value={256351414} />
        </Row>
        <Row>
          <Text fontSize="14px">{t('Assets Under Management (AUM)')}</Text>
          <CardValue fontSize="14px" decimals={0} value={41686155} />
        </Row>
        <Row>
          <Text fontSize="14px">{t('Total Energy Generated')}</Text>
          <CardValue fontSize="14px" decimals={0} value={205082} />
        </Row>
        <Row>
          <Text fontSize="14px">{t('Forecasted total energy generation in next 24 hours')}</Text>
          <CardValue fontSize="14px" decimals={0} value={50} />
        </Row>
      </CardBody>
    </StyledGrayblockStats>
  )
}

export default GrayblockStats