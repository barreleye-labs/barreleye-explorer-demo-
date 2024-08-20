import { ElementType } from 'react';

import loadable from '@loadable/component';

export type RouteContent = { title: string; path: string; icon: ElementType };
export interface Route {
  category: string;
  content: RouteContent[];
}

export const routes: Route[] = [
  {
    category: 'category',
    content: [
      {
        title: 'Dashboard',
        path: '/',
        icon: loadable(() => import('@mui/icons-material/GridViewRounded'))
      },
      {
        title: 'Blocks',
        path: '/blocks',
        icon: loadable(() => import('@mui/icons-material/FilterNoneRounded'))
      },

      {
        title: 'Transactions',
        path: '/transactions',
        icon: loadable(() => import('@mui/icons-material/BeenhereRounded'))
      },

      {
        title: 'Nodes',
        path: '/nodes',
        icon: loadable(() => import('@mui/icons-material/Polyline'))
      }
    ]
  },
  {
    category: 'wallet',
    content: [
      {
        title: 'Account',
        path: '/account',
        icon: loadable(() => import('@mui/icons-material/AlternateEmailRounded'))
      },
      {
        title: 'Create Account',
        path: '/create',
        icon: loadable(() => import('@mui/icons-material/AddBox'))
      },
      {
        title: 'Send Barrel',
        path: '/transfer',
        icon: loadable(() => import('@mui/icons-material/Send'))
      },
      {
        title: 'Barrel Faucet',
        path: '/faucet',
        icon: loadable(() => import('@mui/icons-material/InvertColors'))
      }
    ]
  }
];
