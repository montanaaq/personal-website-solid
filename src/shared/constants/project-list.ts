import type { TranslationKey } from '@/shared/i18n/i18n'

export type TProject = {
  id: number
  nameKey: TranslationKey
  pKey: TranslationKey
  dateKey: TranslationKey
  url: string
  img: string
  imageWidth: number
  imageHeight: number
  isSupport: boolean
  link?: string
  source_code?: string
  imageClassName?: string
}

export const PROJECTS_LIST: TProject[] = [
  {
    id: 1,
    nameKey: 'project.schedule-bot-name',
    pKey: 'project.schedule-bot-description',
    dateKey: 'project.schedule-bot-date',
    url: 'schedulebot',
    img: '/assets/img/schedule_bot.webp',
    imageWidth: 1278,
    imageHeight: 956,
    isSupport: false,
    link: 'https://t.me/gymn33_bot',
    source_code: 'https://github.com/montanaaq/newScheduleBot',
    imageClassName: 'schedulebot_img'
  },
  {
    id: 2,
    nameKey: 'project.sneak-news-bot-name',
    pKey: 'project.sneak-news-bot-description',
    dateKey: 'project.sneak-news-bot-date',
    url: 'sneaknews',
    img: '/assets/img/sneak_news_bot.webp',
    imageWidth: 1042,
    imageHeight: 1840,
    isSupport: false,
    link: 'https://t.me/sneaknews_bot',
    imageClassName: 'sneaknews_img'
  },
  {
    id: 3,
    nameKey: 'project.uni-finder-bot-name',
    pKey: 'project.uni-finder-bot-description',
    dateKey: 'project.uni-finder-bot-date',
    url: 'uni_finder_bot',
    img: '/assets/img/uni_finder_bot.webp',
    imageWidth: 998,
    imageHeight: 964,
    isSupport: false,
    link: 'https://t.me/uni_finder_bot'
  },
  {
    id: 4,
    nameKey: 'project.uni-finder-website-name',
    pKey: 'project.uni-finder-website-description',
    dateKey: 'project.uni-finder-website-date',
    url: 'uni_finder_website',
    img: '/assets/img/uni_finder_site.webp',
    imageWidth: 3240,
    imageHeight: 1974,
    isSupport: false,
    link: 'https://uni-finder-mntq.netlify.app',
    source_code: 'https://github.com/montanaaq/uni-finder-website',
    imageClassName: 'uni_finder_website_img'
  },
  {
    id: 5,
    nameKey: 'project.personal-website-name',
    pKey: 'project.personal-website-description',
    dateKey: 'project.personal-website-date',
    url: 'my_website',
    img: '/assets/img/personal_site.webp',
    imageWidth: 1886,
    imageHeight: 1574,
    isSupport: true,
    link: 'https://montaanaq.netlify.app',
    source_code: 'https://github.com/montanaaq/personal-website-solid',
    imageClassName: 'profile_website_img'
  },
  {
    id: 6,
    nameKey: 'project.desks-duels-name',
    pKey: 'project.desks-duels-description',
    dateKey: 'project.desks-duels-date',
    url: 'desks_duels',
    img: '/assets/img/desk_duels.webp',
    imageWidth: 596,
    imageHeight: 1280,
    isSupport: false,
    link: 'https://t.me/desksduels_bot',
    source_code: 'https://github.com/montanaaq/desks_duels',
    imageClassName: 'desks_duels_img'
  },
  {
    id: 7,
    nameKey: 'project.alfa-ecosystem-name',
    pKey: 'project.alfa-ecosystem-description',
    dateKey: 'project.alfa-ecosystem-date',
    url: 'alfa_ecosystem',
    img: '/assets/img/alfa_ecosystem.webp',
    imageWidth: 2610,
    imageHeight: 1660,
    isSupport: false,
    source_code: 'https://github.com/montanaaq/alfa-ecosystem-task',
    imageClassName: 'alfa_ecosystem_img'
  },
  {
    id: 8,
    nameKey: 'project.juniors-bootcamp-cinema-name',
    pKey: 'project.juniors-bootcamp-cinema-description',
    dateKey: 'project.juniors-bootcamp-cinema-date',
    url: 'juniors_bootcamp_cinema',
    img: '/assets/img/juniors_bootcamp_cinema.webp',
    imageWidth: 5088,
    imageHeight: 3318,
    isSupport: true,
    source_code: 'https://github.com/montanaaq/juniors-bootcamp-cinema',
    imageClassName: 'juniors_bootcamp_cinema_img'
  }
] as const
