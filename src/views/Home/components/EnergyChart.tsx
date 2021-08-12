import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody } from '@pancakeswap/uikit'
import Line from 'views/Lottery/components/PastDrawsHistory/LineChartWrapper'
import Loading from 'views/Lottery/components/Loading'
import { useTranslation } from 'contexts/Localization'
import energyData from 'config/constants/energy'

const StyledLotteryCard = styled(Card)`
  background-image: url('/images/ticket-bg.svg');
  background-repeat: no-repeat;
  background-position: top right;
  min-height: 376px;
`

const InnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const LotteryCard = () => {
  const { t } = useTranslation()
  const [showLast, setShowLast] = useState<'max' | number>('max')
  const [historyData, setHistoryData] = useState(energyData)
  const [historyError, setHistoryError] = useState(false)

  const getDataArray = (kind) => {
    const rawData = historyData
      .map((dataPoint) => {
        return dataPoint[kind]
      })

    return showLast === 'max' ? rawData : rawData.slice(Number(showLast) * -1)
  }
  const lineStyles = ({ color }) => {
    return {
      borderColor: color,
      fill: false,
      borderWidth: 2,
      pointRadius: 0,
      pointHitRadius: 10,
    }
  }
  const chartData = {
    labels: getDataArray('hr'),
    datasets: [
      {
        label: 'kWs',
        data: getDataArray('kWs'),
        yAxisID: 'y-axis-kws',
        ...lineStyles({ color: '#8F80BA' }),
      }
    ],
  }
  const axesStyles = ({ color, lineHeight }) => {
    return {
      borderCapStyle: 'round',
      gridLines: { display: false },
      ticks: {
        fontFamily: 'Kanit, sans-serif',
        fontColor: color,
        fontSize: 12,
        lineHeight,
        maxRotation: 0,
        beginAtZero: true,
        autoSkipPadding: 15,
        userCallback: (value) => {
          return value.toLocaleString()
        },
      },
    }
  }
  const options = useMemo(() => {
    return {
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      legend: { display: false },
      scales: {
        yAxes: [
          {
            type: 'linear',
            position: 'left',
            id: 'y-axis-kws',
            ...axesStyles({ color: '#8f80ba', lineHeight: 1.6 }),
          },
        ],
        xAxes: [
          {
            ...axesStyles({ color: '#452A7A', lineHeight: 1 }),
          },
        ],
      },
    }
  }, [])
  return (
    <StyledLotteryCard>
      <CardBody>
        <Heading scale="xl" mb="24px">
          {t('Energy generated from all Projects')}
        </Heading>
        {!historyError && historyData.length > 1 ? (
        <Line data={chartData} options={options} type="line" />
        ) : (
          <InnerWrapper>
            <Loading />
          </InnerWrapper>
        )}
      </CardBody>
    </StyledLotteryCard>
  )
}

export default LotteryCard
