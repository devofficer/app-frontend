import React from 'react'
import styled from 'styled-components'
import { Heading, BaseLayout } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import PageHeaderBgPic from 'components/PageHeader/PageHeaderBgPic'
import PageSection from 'components/PageSection'
import { useWeb3React } from '@web3-react/core'
import useTheme from 'hooks/useTheme'
import CakeStats from 'views/Home/components/CakeStats'
import TotalValueLockedCard from './components/TotalValueLockedCard'
// import UserBanner from './components/UserBanner'
import FarmStakingCard from './components/FarmStakingCard'
import EnergyChart from './components/EnergyChart'

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 32px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

const Home: React.FC = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const { account } = useWeb3React()

  return (
    <>
      <PageHeaderBgPic backgroundImage='/images/ifos/banner-1.png' >
        <Heading as="h1" scale="xl" color="#000" mb="24px">
          {t('PancakeSwap')}
        </Heading>
        <Heading scale="md" color="#170E25">
          {t('The #1 AMM and yield farm on Binance Smart Chain.')}
        </Heading>
      </PageHeaderBgPic>
      <PageSection
        innerProps={{ style: { margin: '0', width: '100%', 'paddingTop':'0px', 'paddingBottom':'0px'} }}
        background={ theme.isDark ? '#170E25' : '#D9CDED' }
        index={2}
        hasCurvedDivider={false}
      >
        <Cards>
          <FarmStakingCard />
          <EnergyChart />
        </Cards>
      </PageSection>
      <PageSection
        innerProps={{ style: { margin: '0', width: '100%', 'paddingTop':'0px', 'paddingBottom':'0px' } }}
        background={theme.colors.background}
        index={2}
        hasCurvedDivider={false}
      >
        <CakeStats />
        <TotalValueLockedCard />
      </PageSection>
    </>
  )
}

export default Home
