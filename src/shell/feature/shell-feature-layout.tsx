import { type PropsWithChildren, Suspense } from 'react'
import { Outlet } from 'react-router'

import { SolanaUiGlobalStatus } from '@/solana/ui/solana-ui-global-status'

import { ShellUiFooter } from '../ui/shell-ui-footer'
import { type HeaderLink, ShellUiHeader } from '../ui/shell-ui-header'

export default function ShellFeatureLayout({
  children = <Outlet />,
  links,
}: PropsWithChildren<{ links: HeaderLink[] }>) {
  return (
    <div className="flex h-full min-h-screen w-full flex-col">
      <ShellUiHeader links={links} />
      <main className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto">
        <SolanaUiGlobalStatus />
        <Suspense>{children}</Suspense>
      </main>
      <ShellUiFooter />
    </div>
  )
}
