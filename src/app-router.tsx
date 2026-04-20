import { createBrowserRouter, Navigate } from 'react-router'

import type { ShellNotFoundProps } from '@/shell/data-access/shell-not-found-props'

import { ShellFeature, ShellUiLoader } from '@/shell/feature'

const baseUrl = import.meta.env.BASE_URL
const basename = baseUrl === '/' ? '/' : baseUrl.replace(/\/$/, '')

export const appRouter = createBrowserRouter(
  [
    {
      children: [
        { element: <Navigate replace to="/vector" />, index: true },
        {
          lazy: () => import('@/about/feature/about-feature'),
          path: 'about',
        },
        {
          lazy: () => import('@/vector/feature/vector-feature'),
          path: 'vector',
        },
        {
          lazy: () => import('@/wallet/feature/wallet-feature'),
          path: 'wallet',
        },
        {
          lazy: () => import('@/shell/feature/shell-not-found-feature'),
          loader: (): ShellNotFoundProps => ({
            links: [
              {
                description:
                  'Open the Vector workflow to initialize a signer-bound PDA and run the localnet advance demo.',
                title: 'Vector',
                to: '/vector',
              },
              {
                description: 'Open the wallet screen if you were looking for connection and signing tools.',
                title: 'Wallet',
                to: '/wallet',
              },
              {
                description: 'Read how this demo maps to the upstream Vector protocol and how to run the flow locally.',
                title: 'About',
                to: '/about',
              },
            ],
          }),
          path: '*',
        },
      ],
      element: (
        <ShellFeature
          links={[
            { label: 'Vector', to: '/vector' },
            { label: 'Wallet', to: '/wallet' },
            { label: 'About', to: '/about' },
          ]}
        />
      ),
      hydrateFallbackElement: <ShellUiLoader fullScreen />,
    },
  ],
  {
    basename,
  },
)
