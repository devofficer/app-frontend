import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { Route, useRouteMatch, Link } from 'react-router-dom'
import PageHeaderBgPic from 'components/PageHeader/PageHeaderBgPic'
import { Heading } from '@pancakeswap/uikit'
import Container from 'components/Layout/Container'
import CurrentIfo from './CurrentIfo'

const StyledPage = styled(Container)`
  min-height: calc(100vh - 64px);
  padding-top: 16px;
  padding-bottom: 16px;
  background: ${({ theme }) => theme.isDark ? '#1C2730' : '#30BFF1' };

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-top: 24px;
    padding-bottom: 24px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 32px;
    padding-bottom: 32px;
  }
`

const Ifos = () => {
  const { t } = useTranslation()
  const { path, url, isExact } = useRouteMatch()

  return (
    <>
      <PageHeaderBgPic backgroundImage="/images/ifos/banner-1.png">
        <Heading as="h1" scale="xl" color="#000" mb="24px">
          {t('Initial ENERGY FARM OFFERING')}
        </Heading>
        <Heading scale="md" color="#170E25">
          {t('Buy New Energy Project Tokens to generate energy backed yield')}
        </Heading>
      </PageHeaderBgPic>
      <StyledPage>
        <Route exact path={`${path}`}>
          <CurrentIfo />
        </Route>
      </StyledPage>
    </>
  )
}

export default Ifos
