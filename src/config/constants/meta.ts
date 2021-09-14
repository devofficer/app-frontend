import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'GrayblockSwap',
  description:
    'The most popular AMM on BSC by user count! Earn CAKE through yield farming or win it in the Lottery, then stake it in Syrup Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by PancakeSwap), NFTs, and more, on a platform you can trust.',
  image: 'https://pancakeswap.finance/images/hero.png',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  switch (path) {
    case '/':
      return {
        title: `${t('Home')} | GrayblockSwap`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | GrayblockSwap`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | GrayblockSwap`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | GrayblockSwap`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | GrayblockSwap`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | GrayblockSwap`,
      }
    case '/collectibles':
      return {
        title: `${t('Collectibles')} | GrayblockSwap`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | GrayblockSwap`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | GrayblockSwap`,
      }
    case '/profile/tasks':
      return {
        title: `${t('Task Center')} | GrayblockSwap`,
      }
    case '/profile':
      return {
        title: `${t('Your Profile')} | GrayblockSwap`,
      }
    default:
      return null
  }
}
