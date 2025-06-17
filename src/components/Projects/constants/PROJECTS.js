import {
  faBuilding,
  faGlassMartini,
  faBasketballBall,
  faShoppingBasket,
} from '@fortawesome/fontawesome-free-solid';
import { faGithubSquare } from '@fortawesome/free-brands-svg-icons';

export const PROJECTS = [
  {
    id: 6,
    title: 'NBA Everything',
    description: `An all things NBA data, sourced from the Ball Don't Lie API. Built with NextJS, React, Typescript and Tailwind`,
    icon: faBasketballBall,
    to: 'https://nba-everything-dev.vercel.app/',
    externalSrc: true,
  },
  {
    id: 5,
    title: 'Cocktail App',
    description: `Search over 600 cocktails by drink name, glass type or ingredients 🥂🍻! Built with NextJS, React, Typescript and Tailwind`,
    icon: faGlassMartini,
    to: 'https://find-cocktails.vercel.app/',
    externalSrc: true,
  },
  {
    id: 7,
    title: 'Morning Dough',
    description: `A donut shop ecommerce website utilizing Next JS, Typescript, Tailwind/Twin Macro/Styled components and Square POS`,
    icon: faShoppingBasket,
    to: 'http://morning-dough.com/',
    externalSrc: true,
  },
  {
    id: 3,
    title: 'Github Finder Project',
    description:
      'A tool for searching Github users, cleanly presented it in a user-friendly Nuxt, Vue, Typescript app. Data is sourced from the Github API.',
    icon: faGithubSquare,
    to: 'https://github-finder-live.vercel.app/',
    externalSrc: true,
  },
  {
    id: 4,
    title: 'Housing Marketplace',
    description: `An app that shows listings, current offers on listings and allows to create new listings. All data is pulled from a MongoDB via an Express backend.`,
    icon: faBuilding,
    to: '/housing-marketplace/auth',
  },
];
