import { Breadcrumb } from "../components/Breadcrumb"


export const ForoAcademico = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '#' },
    { label: 'Foro Académico', href: '#' },
    { label: 'Posts' }, // Último elemento sin enlace
  ];
  return (
    <div className="flex flex-col w-full">
      <div className="self-start">
        <Breadcrumb items={breadcrumbItems}></Breadcrumb>
      </div>
      <div className="flex flex-col items-center">
        <h1>Foro Academico</h1>
        <p>Foro academico para estudiantes de la Universidad de La Sabana</p>
      </div>
    </div>
  )
}