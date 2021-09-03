import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { Route, useRouteMatch, Link } from 'react-router-dom'
import PageHeader from 'components/PageHeader'
import { Heading } from '@pancakeswap/uikit'
import Container from 'components/Layout/Container'
import CurrentIfo from './CurrentIfo'
// import PastIfo from './PastIfo'

const Ifos = () => {
  const { t } = useTranslation()
  const { path, url, isExact } = useRouteMatch()

  return (
    <>
      <PageHeader>
        <Heading as="h1" scale="xxl" color="secondary" mb="24px">
          {t('IFO: Initial Farm Offerings')}
        </Heading>
        <Heading scale="lg" color="text">
          {t('Buy new tokens with a brand new token sale model.')}
        </Heading>
      </PageHeader>
      <Container>
        <Route exact path={`${path}`}>
          <CurrentIfo />
        </Route>
      </Container>
    </>
  )
}

export default Ifos
