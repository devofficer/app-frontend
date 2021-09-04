import React from 'react'
import styled from 'styled-components'

const HomePageHeader = styled.div<{ backgroundImage?: string }>`
  background: url(${({ backgroundImage }) => (backgroundImage || '/images/ifos/banner-1.png') });
  height: 206px;
  background-repeat: repeat-x;
  background-position: left top;
  background-size: cover;
  justify-content: center;
  flex-direction: column;
  display: flex;
  -moz-box-pack: center;
  -moz-box-align: center;
  align-items: center;
`

const PageHeaderBgPic: React.FC<{ backgroundImage?: string }> = ({ backgroundImage, children, ...props }) => (
  <HomePageHeader backgroundImage={backgroundImage} {...props}>
    {children}
  </HomePageHeader>
)

export default PageHeaderBgPic
