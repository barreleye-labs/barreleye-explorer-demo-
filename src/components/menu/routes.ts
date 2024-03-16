// @ts-ignore
import loadable from '@loadable/component';

import { ElementType } from 'react';

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
        path: '/dashboard',
        icon: loadable(() => import('@mui/icons-material/GridViewRounded'))
      },
      {
        title: 'Blocks',
        path: '/block.d.ts',
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
