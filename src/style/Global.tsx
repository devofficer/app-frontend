import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { PancakeTheme } from '@pancakeswap/uikit/dist/theme'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Manrope', sans-serif;
  }
  body {
    background-color: ${({ theme }) => (theme.isDark ? '#1C2730' : '#30bff1')};

    img {
      height: auto;
      max-width: 100%;
    }
  }
`

export default GlobalStyle
