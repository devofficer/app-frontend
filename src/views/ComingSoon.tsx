import React from 'react'
import styled from 'styled-components'
import { Button, Heading, Text, LogoIcon } from '@pancakeswap/uikit'
import Page from 'components/Layout/Page'
import { useTranslation } from 'contexts/Localization'

const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 130px);
  justify-content: center;
`

const ComingSoon = () => {
  const { t } = useTranslation()

  return (
    <Page>
      <StyledNotFound>
        {/* <LogoIcon width="64px" mb="8px" /> */}
        <Heading scale="xl">Coming soon</Heading>
        <Button as="a" href="/" scale="sm" my="10px">
          {t('Back Home')}
        </Button>
      </StyledNotFound>
    </Page>
  )
}

export default ComingSoon
