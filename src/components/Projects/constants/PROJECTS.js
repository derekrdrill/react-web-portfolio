import {
  faFileAlt,
  faDatabase,
  faBuilding,
  faGlassMartini,
  faBasketballBall,
  faShoppingBasket,
} from '@fortawesome/fontawesome-free-solid';
import { faGithubSquare } from '@fortawesome/free-brands-svg-icons';

export const PROJECTS = [
  {
    id: 7,
    title: 'Morning Dough',
    description: `A donut shop ecommerce website utilizing Next JS, Typescript and Square POS`,
    icon: faShoppingBasket,
    to: 'http://morning-dough.com/',
    externalSrc: true,
  },
  {
    id: 6,
    title: 'NBA Everything',
    description: `An all things NBA data, sourced from the Ball Don't Lie API`,
    icon: faBasketballBall,
    to: '/nba-everything',
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
    id: 5,
    title: 'Cocktail App',
    description: `Users can search by drink name or ingredients to return data on over 635 different cocktails! 🥂🍻`,
    icon: faGlassMartini,
    to: '/drink-up',
  },
  {
    id: 4,
    title: 'Housing Marketplace',
    description: `An app that shows listings, current offers on listings and allows to create new listings. All data is pulled from a MongoDB via an Express backend.`,
    icon: faBuilding,
    to: '/housing-marketplace/auth',
  },
  {
    id: 2,
    title: 'Lead Input App',
    description: `A simple input form that writes to a MongoDB.
                      Included is a dynamic reporting table to track the input data.`,
    icon: faDatabase,
    to: '/lead-input-page',
  },
  {
    id: 1,
    title: 'Job Applications',
    description: `A simple concept used to show different levels of web-form building with React`,
    icon: faFileAlt,
    to: '/job-apps-page',
  },
];
