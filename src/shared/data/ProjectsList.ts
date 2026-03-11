export type TProject = {
  id: number
  nameKey: string
  pKey: string
  dateKey: string
  url: string
  img?: string
  main_name: string
  isSupport: boolean
  link?: string
  source_code?: string
  imageClassName?: string
}

export const projectsList: TProject[] = [
  {
    id: 1,
    nameKey: 'project.schedule-bot-name',
    pKey: 'project.schedule-bot-description',
    dateKey: 'project.schedule-bot-date',
    url: 'schedulebot',
    img: 'assets/img/schedule_bot.webp',
    main_name: 'Schedule Bot',
    isSupport: true,
    link: 'http://t.me/gymn33_bot',
    source_code: 'https://github.com/montanaaq/newScheduleBot',
    imageClassName: 'schedulebot_img'
  },
  {
    id: 2,
    nameKey: 'project.sneak-news-bot-name',
    pKey: 'project.sneak-news-bot-description',
    dateKey: 'project.sneak-news-bot-date',
    url: 'sneaknews',
    img: 'assets/img/sneak_news_bot.webp',
    main_name: 'SneakNews Bot',
    isSupport: false,
    link: 'http://t.me/sneaknews_bot',
    imageClassName: 'sneaknews_img'
  },
  {
    id: 3,
    nameKey: 'project.uni-finder-bot-name',
    pKey: 'project.uni-finder-bot-description',
    dateKey: 'project.uni-finder-bot-date',
    url: 'uni_finder_bot',
    img: 'https://i.imgur.com/afWkow6.png',
    main_name: 'UniFinder Bot',
    isSupport: false,
    link: 'http://t.me/uni_finder_bot'
  },
  {
    id: 4,
    nameKey: 'project.uni-finder-website-name',
    pKey: 'project.uni-finder-website-description',
    dateKey: 'project.uni-finder-website-date',
    url: 'uni_finder_website',
    img: 'assets/img/uni_finder_site.webp',
    main_name: 'UniFinder Site',
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
    img: 'assets/img/personal_site.webp',
    main_name: 'My Personal Site',
    isSupport: true,
    link: 'https://montaanaq.netlify.app',
    source_code: 'https://github.com/montanaaq/personal-website',
    imageClassName: 'profile_website_img'
  },
  {
    id: 6,
    nameKey: 'project.desks-duels-name',
    pKey: 'project.desks-duels-description',
    dateKey: 'project.desks-duels-date',
    url: 'desks_duels',
    img: 'assets/img/desk_duels.webp',
    main_name: 'Desks Duels',
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
    img: 'assets/img/alfa_ecosystem.webp',
    main_name: 'News SPA Webapp',
    isSupport: false,
    source_code: 'https://github.com/montanaaq/alfa-ecosystem-task',
    imageClassName: 'alfa_ecosystem_img'
  }
]
