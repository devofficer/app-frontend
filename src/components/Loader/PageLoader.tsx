import React from 'react'
import styled from 'styled-components'
import { Spinner } from '@pancakeswap/uikit'
import Page from '../Layout/Page'

const Wrapper = styled(Page)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const PageLoader: React.FC = () => {
  return (
    <Wrapper>
      <Spinner />
      {/* <video width="100" height="100">
        <source src="/videos/loader.mp4" type="video/mp4" />
      </video> */}
    </Wrapper>
  )
}

export default PageLoader
