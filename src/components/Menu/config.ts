import { MenuEntry } from '@pancakeswap/uikit'
import { ContextApi } from 'contexts/Localization/types'

const config: (t: ContextApi['t']) => MenuEntry[] = (t) => [
  {
    label: t('Home'),
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: t('Exchange'),
    icon: 'TradeIcon',
    href: '/swap',
    // items: [
    //   {
    //     label: t('Exchange'),
    //     href: '/swap',
    //   },
      // {
      //   label: t('Liquidity'),
      //   href: '/pool',
      // },
      // {
      //   label: t('LP Migration'),
      //   href: '/coming-soon',
      // },
    // ],
  },
  {
    label: t('Farms'),
    icon: 'FarmIcon',
    href: '/farms',
  },
  // {
  //   label: t('Pools'),
  //   icon: 'PoolIcon',
  //   href: '/pools',
  // },
  // {
  //   label: t('Prediction (BETA)'),
  //   icon: 'PredictionsIcon',
  //   href: '/prediction',
  // },
  // {
  //   label: t('Lottery'),
  //   icon: 'TicketIcon',
  //   href: '/lottery',
  // },
  // {
  //   label: t('Collectibles'),
  //   icon: 'NftIcon',
  //   href: '/collectibles',
  // },
  // {
  //   label: t('Team Battle'),
  //   icon: 'TeamBattleIcon',
  //   href: '/competition',
  // },
  // {
  //   label: t('Teams & Profile'),
  //   icon: 'GroupsIcon',
  //   items: [
  //     {
  //       label: t('Leaderboard'),
  //       href: '/teams',
  //     },
  //     {
  //       label: t('Task Center'),
  //       href: '/profile/tasks',
  //     },
  //     {
  //       label: t('Your Profile'),
  //       href: '/profile',
  //     },
  //   ],
  // },
  // {
  //   label: t('Info'),
  //   icon: 'InfoIcon',
  //   href: '/coming-soon',
  // },
  {
    label: t('IFO'),
    icon: 'IfoIcon',
    href: '/ifo',
  },
  {
    label: t('More'),
    icon: 'MoreIcon',
    items: [
      {
        label: t('Contact'),
        href: 'https://www.grayblockpower.com/#Contact',
      },
      {
        label: t('Voting'),
        href: '/coming-soon',
      },
      {
        label: t('Github'),
        href: '/coming-soon',
      },
      {
        label: t('Gitbook'),
        href: '/coming-soon',
      },
      {
        label: t('Blog'),
        href: 'https://medium.com/@grayblockpower',
      },
      // {
      //   label: t('Merch'),
      //   href: '/coming-soon',
      // },
    ],
  },
]

export default config
