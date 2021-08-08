import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'GPNSwap',
  description:
    'The most popular AMM on BSC by user count! Earn CAKE through yield farming or win it in the Lottery, then stake it in Syrup Pools to earn more tokens! Initial Farm Offerings (new token launch model pioneered by PancakeSwap), NFTs, and more, on a platform you can trust.',
  image: 'https://pancakeswap.finance/images/hero.png',
}

export const customMeta: { [key: string]: PageMeta } = {
  '/': {
    title: 'Home | GPNSwap',
  },
  '/competition': {
    title: 'Trading Battle | GPNSwap',
  },
  '/prediction': {
    title: 'Prediction | GPNSwap',
  },
  '/farms': {
    title: 'Farms | GPNSwap',
  },
  '/pools': {
    title: 'Pools | GPNSwap',
  },
  '/lottery': {
    title: 'Lottery | GPNSwap',
  },
  '/collectibles': {
    title: 'Collectibles | GPNSwap',
  },
  '/ifo': {
    title: 'Initial Farm Offering | GPNSwap',
  },
  '/teams': {
    title: 'Leaderboard | GPNSwap',
  },
  '/profile/tasks': {
    title: 'Task Center | GPNSwap',
  },
  '/profile': {
    title: 'Your Profile | GPNSwap',
  },
}
