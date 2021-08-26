import React from 'react'
import styled from 'styled-components'
import { BaseLayout } from '@pancakeswap/uikit'
import PageSection from 'components/PageSection'
import { useWeb3React } from '@web3-react/core'
import useTheme from 'hooks/useTheme'
import Container from 'components/Layout/Container'
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
  const { theme } = useTheme()
  const { account } = useWeb3React()

  const CakeStatsContainerStyles = { margin: '0', width: '100%' }

  return (
    <>
      <PageSection
        innerProps={{ style: { margin: '0', width: '100%' } }}
        background={
          theme.isDark
            ? 'linear-gradient(180deg, #09070C 22%, #201335 100%)'
            : 'linear-gradient(180deg, #FFFFFF 22%, #D7CAEC 100%)'
        }
        index={2}
        hasCurvedDivider={false}
      >
        <Cards>
          <FarmStakingCard />
          <EnergyChart />
        </Cards>
      </PageSection>
      <PageSection
        innerProps={{ style: CakeStatsContainerStyles }}
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
