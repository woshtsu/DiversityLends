import { Header } from '../components/MainHeader.tsx'
import { MainFooter } from '../components/MainFooter.tsx'
import { Outlet } from 'react-router-dom'


export function MainLayout() {
  return (
    <>
      <Header />
      <div className="w-full min-h-screen flex flex-col p-4">
      <Outlet />
      </div>
      <MainFooter />
    </>
  )
}