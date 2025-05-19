import { Header } from '../components/MainHeader.tsx'
import { MainFooter } from '../components/MainFooter.tsx'
import { Outlet } from 'react-router-dom'


export function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <MainFooter />
    </>
  )
}