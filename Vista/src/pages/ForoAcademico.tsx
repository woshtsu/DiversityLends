import { Breadcrumb } from "../components/Breadcrumb"
import { FormPost } from "../components/FormPost";


export const ForoAcademico = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '#' },
    { label: 'Foro Académico', href: '#' },
    { label: 'Posts' },
  ];
  return (
    <div className="flex flex-col h-screen">
      <div className="bg-blue-200 p-4">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <div className="bg-gray-200 flex-1 p-4 overflow-y-auto">
        <FormPost/>
      </div>
    </div>
  )
}