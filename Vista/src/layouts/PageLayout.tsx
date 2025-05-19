import { Outlet } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader.tsx';


export function PageLayout() {
  return (
    <section>
      <PageHeader />
      <div className="w-full min-h-screen flex flex-col p-4">
        <Outlet />
      </div>
    </section>
  )
}