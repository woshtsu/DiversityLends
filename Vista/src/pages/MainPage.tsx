import { MainLayout } from '../layouts/MainLayout.tsx'
import { PageLayout } from '../layouts/PageLayout.tsx'
import { ForoAcademico } from './ForoAcademico.tsx'

export const MainPage = () => {
  return (
    <MainLayout>
      <PageLayout >
        <ForoAcademico />
      </PageLayout>
    </MainLayout>
  )
}