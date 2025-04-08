import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  {
    title: 'Live monitoring',
    path: '/',
    icon: icon('ic-live'),
  },
  {
    title: 'History',
    path: '/history',
    icon: icon('ic-analytics'),
  },
  // {
  //   title: 'Actuator control',
  //   path: '/actuator-control',
  //   icon: icon('ic-cart'),
  // },
  // {
  //   title: 'Sign in',
  //   path: '/sign-in',
  //   icon: icon('ic-lock'),
  // },
];
