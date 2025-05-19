import { Header } from '../components/MainHeader.tsx'
import { MainFooter } from '../components/MainFooter.tsx'
import type { ReactNode } from 'react'

type LayoutProps = {
  children: ReactNode;
}

export function MainLayout({ children }: LayoutProps) {
  return (
    <section>
      <Header />
      {children}
      <MainFooter />
    </section>
  )
}