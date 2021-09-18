import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody } from '@pancakeswap/uikit'
import Line from 'components/Chart/LineChartWrapper'
import { useTranslation } from 'contexts/Localization'
import energyData from 'config/constants/energy'

const StyledChartCard = styled(Card)`
  background-image: url('/images/ticket-bg.svg');
  background-repeat: no-repeat;
  background-position: top right;
  min-height: 376px;
`
const StyledHeader = styled.div`
  position: absolute;
  z-index: 400;
  margin: auto 0;
  display: block;
  height: 100%;
  width: 100%;
  background: rgba(0,0,0,0.8);
  text-align: center;
  font-size: 24px;
  font-weight: bolder;
`

const StyledSpan = styled.div`
  position: relative;
  top: 50%;
  display: block;
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
        fontFamily: 'Manrope, sans-serif',
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
            ...axesStyles({ color: '#8f80ba', lineHeight: 1 }),
          },
        ],
      },
    }
  }, [])

  return (
    <StyledChartCard>
        <StyledHeader>
          <StyledSpan>coming soon</StyledSpan>
        </StyledHeader>
      <CardBody>
        <Heading scale="xl" mb="24px">
          {t('Energy generated from all Projects')}
        </Heading>
        <Line data={chartData} options={options} type="line" />
      </CardBody>
    </StyledChartCard>
  )
}

export default LotteryCard
