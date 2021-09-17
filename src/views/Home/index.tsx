import React from 'react'
import styled from 'styled-components'
import { Heading, BaseLayout } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import PageHeaderBgPic from 'components/PageHeader/PageHeaderBgPic'
import PageSection from 'components/PageSection'
import { useWeb3React } from '@web3-react/core'
import useTheme from 'hooks/useTheme'
import GrayblockStats from 'views/Home/components/GrayblockStats'
import GpnLpWorth from 'views/Home/components/GpnLpWorth'
// import CakeStats from 'views/Home/components/CakeStats'
// import TotalValueLockedCard from './components/TotalValueLockedCard'
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

  ${({ theme }) => theme.mediaQueries.md} {
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
      <PageHeaderBgPic backgroundImage="/images/home/banner-1.png">
        <Heading as="h1" scale="xl" color="#000" mb="24px">
          {t('PancakeSwap')}
        </Heading>
        <Heading scale="md" color="#170E25">
          {t('The #1 AMM and yield farm on Binance Smart Chain.')}
        </Heading>
      </PageHeaderBgPic>
      <PageSection
        innerProps={{ style: { margin: '0', width: '100%', paddingTop: '0px', paddingBottom: '0px' } }}
        background={theme.isDark ? '#1C2730' : '#30BFF1'}
        index={2}
        hasCurvedDivider={false}
      >
        <img
          src="/images/energySystem/DAPP_Assets_Homepage_Hydro_transparent-01.png"
          alt="tako"
          style={{
            position: 'absolute',
            left: '-40px',
            top: '-100px',
            width: '500px',
            height: '500px',
            opacity: '0.2',
          }}
        />
        <img
          src="/images/energySystem/DAPP_Assets_Homepage_wind_transparent-01.png"
          alt="tako"
          style={{
            position: 'absolute',
            left: '85%',
            bottom: '-50px',
            width: '500px',
            height: '500px',
            transform: 'translateX(-50%)',
            opacity: '0.2',
          }}
        />
        <Cards>
          <FarmStakingCard />
          <EnergyChart />
        </Cards>

        <Cards>
          <GrayblockStats />
          <GpnLpWorth />
        </Cards>
      </PageSection>

      {/* <PageSection
        innerProps={{ style: { margin: '0', width: '100%', 'paddingTop':'0px', 'paddingBottom':'0px' } }}
        background={theme.colors.background}
        index={2}
        hasCurvedDivider={false}
      >
        <CakeStats />
        <TotalValueLockedCard />
      </PageSection> */}
    </>
  )
}

export default Home
