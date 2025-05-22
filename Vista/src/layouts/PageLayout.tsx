import { Outlet } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader.tsx';


export function PageLayout() {
  return (
    <section>
      <PageHeader />
      <div className="flex flex-col">
        <Outlet />
      </div>
    </section>
  )
}