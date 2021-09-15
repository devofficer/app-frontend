import React, { useState } from 'react'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import { Card, CardBody, CardHeader, Text, useTooltip, HelpIcon, Flex, Progress } from '@pancakeswap/uikit';
// import { Progress } from '@pancakeswap-libs/uikit'
import { Ifo, PoolIds } from 'config/constants/types'
import { useProfile } from 'state/profile/hooks'
import { PublicIfoData, WalletIfoData } from 'views/Ifos/types'
import DetailsSection from './DetailSection'
import { EnableStatus } from '../types'
import IfoCardTokens from './IfoCardTokens'
import IfoCardActions from './IfoCardActions'
import IfoCardDetails from './IfoCardDetails'

const ExpandingWrapper = styled.div`
  padding: 24px;
  border-top: 2px solid ${({ theme }) => theme.colors.cardBorder};
  overflow: hidden;
  border-radius: 0px;
  margin-bottom: -20px;
`

const ProgressBar = styled.div`
  .dsEXc {
    background-color: #1fc7d4;
  }
`

interface IfoCardProps {
  poolId: PoolIds
  ifo: Ifo
  publicIfoData: PublicIfoData
  walletIfoData: WalletIfoData
  onApprove: () => Promise<any>
  enableStatus: EnableStatus
}

interface CardConfig {
  [key: string]: {
    title: string
    variant: 'blue' | 'violet'
    tooltip: string
  }
}

const cardConfig: CardConfig = {
  [PoolIds.poolBasic]: {
    title: 'Basic Sale',
    variant: 'blue',
    tooltip: 'Every person can only commit a limited amount, but may expect a higher return per token committed.',
  },
  [PoolIds.poolUnlimited]: {
    title: 'Unlimited Sale',
    variant: 'violet',
    tooltip: 'No limits on the amount you can commit. Additional fee applies when claiming.',
  },
}

const SmallCard: React.FC<IfoCardProps> = ({ poolId, ifo, publicIfoData, walletIfoData, onApprove, enableStatus }) => {
  const { t } = useTranslation()
  const config = cardConfig[poolId]
  const { hasProfile, isLoading: isProfileLoading } = useProfile();
  const [showExpandableSection, setShowExpandableSection] = useState(false)

  const { targetRef, tooltip, tooltipVisible } = useTooltip(t(config.tooltip), { placement: 'bottom' })

  const isLoading = isProfileLoading || publicIfoData.status === 'idle'

  return (
    <>
      {tooltipVisible && tooltip}
      <Card>
        <CardHeader variant={config.variant}>
          <Flex justifyContent="space-between" alignItems="center" margin="-24px">
            <img
              src="/images/gvs-ifo.jpg"
              alt="image1"
              style={{
                width: '100%',
                height: '100%',
                opacity: '1.0',
              }}
            />
            {/* <Text bold fontSize="20px">
              {t(config.title)}
            </Text>
            <div ref={targetRef}>
              <HelpIcon />
            </div> */}
          </Flex>
        </CardHeader>
        <CardBody>
          <IfoCardTokens
            poolId={poolId}
            ifo={ifo}
            publicIfoData={publicIfoData}
            walletIfoData={walletIfoData}
            hasProfile={hasProfile}
            isLoading={isLoading}
            onApprove={onApprove}
            enableStatus={enableStatus}
          />
          <div>
            <ProgressBar>
              <Progress variant="round" primaryStep={100} />
            </ProgressBar>
          </div>
          <h1 style={{ textAlign: 'center', marginBottom: '20px', marginTop: '20px' }}>Finished</h1>
          <IfoCardActions
            poolId={poolId}
            ifo={ifo}
            publicIfoData={publicIfoData}
            walletIfoData={walletIfoData}
            hasProfile={hasProfile}
            isLoading={isLoading}
          />
          <IfoCardDetails poolId={poolId} ifo={ifo} publicIfoData={publicIfoData} />
          <ExpandingWrapper>
            <ExpandableSectionButton
              onClick={() => setShowExpandableSection(!showExpandableSection)}
              expanded={showExpandableSection}
            />
            {showExpandableSection && (
              <DetailsSection
                // removed={removed}
                // bscScanAddress={getBscScanLink(lpAddress, 'address')}
                // infoAddress={`https://pancakeswap.info/pool/${lpAddress}`}
                totalValueFormatted="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                // lpLabel={lpLabel}
                // addLiquidityUrl={addLiquidityUrl}
              />
            )}
          </ExpandingWrapper>
          <a
            target="_blank"
            rel="noreferrer noopener"
            href="https://www.grayblockpower.com/"
            color="#1FC7D4"
            className="sc-gsTCUz sc-lmoMRL ikDOqW iqbrwR"
            style={{
              margin: '12px auto auto',
              display: 'flex',
              justifyContent: 'center',
              color: '#1FC7D4',
              fontWeight: 'bold',
            }}
          >
            View project site
            <svg
              viewBox="0 0 24 24"
              color="#1FC7D4"
              width="20px"
              xmlns="http://www.w3.org/2000/svg"
              className="sc-bdfBwQ glXgPM"
              style={{ fill: '#1FC7D4' }}
            >
              <path d="M18 19H6C5.45 19 5 18.55 5 18V6C5 5.45 5.45 5 6 5H11C11.55 5 12 4.55 12 4C12 3.45 11.55 3 11 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V13C21 12.45 20.55 12 20 12C19.45 12 19 12.45 19 13V18C19 18.55 18.55 19 18 19ZM14 4C14 4.55 14.45 5 15 5H17.59L8.46 14.13C8.07 14.52 8.07 15.15 8.46 15.54C8.85 15.93 9.48 15.93 9.87 15.54L19 6.41V9C19 9.55 19.45 10 20 10C20.55 10 21 9.55 21 9V4C21 3.45 20.55 3 20 3H15C14.45 3 14 3.45 14 4Z" />
            </svg>
          </a>
        </CardBody>
      </Card>
    </>
  )
}

export default SmallCard
