import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { Route, useRouteMatch, Link } from 'react-router-dom'
import PageHeaderBgPic from 'components/PageHeader/PageHeaderBgPic'
import { Heading } from '@pancakeswap/uikit'
import Container from 'components/Layout/Container'
import CurrentIfo from './CurrentIfo'

const Ifos = () => {
  const { t } = useTranslation()
  const { path, url, isExact } = useRouteMatch()

  return (
    <>
      <PageHeaderBgPic backgroundImage='/images/ifos/banner-1.png' >
        <Heading as="h1" scale="xl" color="#000" mb="24px">
          {t('IFO: Initial Farm Offerings')}
        </Heading>
        <Heading scale="md" color="#170E25">
          {t('Buy new tokens with a brand new token sale model.')}
        </Heading>
      </PageHeaderBgPic>
      <Container>
        <Route exact path={`${path}`}>
          <CurrentIfo />
        </Route>
      </Container>
    </>
  )
}

export default Ifos
