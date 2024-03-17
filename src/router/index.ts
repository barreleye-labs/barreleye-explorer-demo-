import { createBrowserRouter } from 'react-router-dom';

import loadable from '@loadable/component';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: loadable(() => import('@src/App')),
    errorElement: loadable(() => import('@pages/errorPage')),
    children: [
      {
        path: '/dashboard',
        Component: loadable(() => import('@pages/dashboard'))
      },
      {
        path: '/blocks',
        Component: loadable(() => import('@pages/blocks'))
      },

      { path: '/block/:height', Component: loadable(() => import('@pages/block')) },

      {
        path: '/transactions',
        Component: loadable(() => import('@pages/transactions'))
      },

      { path: '/transaction/:hash', Component: loadable(() => import('@pages/transaction')) },

      {
        path: '/account/:address?',
        Component: loadable(() => import('src/pages/account'))
      },

      {
        path: '/nodes',
        Component: loadable(() => import('src/pages/nodes'))
      },

      // ===================== wallet ===============================
      {
        path: '/create',
        Component: loadable(() => import('@pages/wallet/create'))
      },
      {
        path: '/transfer',
        Component: loadable(() => import('@pages/wallet/transfer'))
      },
      {
        path: '/faucet',
        Component: loadable(() => import('@pages/wallet/faucet'))
      }
      // ==========================================================
    ]
  }
]);
