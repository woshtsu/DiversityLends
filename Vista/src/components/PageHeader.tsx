import { Breadcrumb } from './Breadcrumb.tsx'; // Asegúrate de que la ruta sea correcta
import { NavBar } from './NavBar.tsx';

export const PageHeader = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '#' },
  ];
  const navItems = [
    { label: 'Métricas', href: 'metricas' },
    { label: 'Noticias', href: 'noticias' },
    { label: 'Pronóstico', href: 'pronostico' },
    { label: 'Foro', href: 'foro' },
    { label: 'Foro Académico', href: 'foro-academico' },
    { label: 'Ubicación', href: 'ubicacion' }
  ]

  return (
    <header className="flex flex-col w-full">
      <div className="container mx-auto p-6 self-start">
        <Breadcrumb items={breadcrumbItems} />

        <div className="flex items-center mt-4">
          {/* Icono y Ranking */}
          <div className="flex-shrink-0 mr-4">
            <div className="relative">
              {/* Placeholder para el icono de Bitcoin */}
              <img 
                src='../../public/LlamaIcon.jpg'
                alt="Descripción de la imagen"
                className="w-45 h-55 object-cover rounded-lg shadow-lg"
              />
              <span className="absolute bottom-0 left-0 bg-black text-white text-xs font-semibold px-2 py-1 rounded-md">
                #1
              </span>
            </div>
          </div>

          {/* Información principal */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Llama</h1>

            {/* Selector de par y exchange */}
            <div className="flex items-center mt-2">
              <div className="flex items-center border rounded-md px-3 py-1 text-sm text-gray-700">
                Especie
                <span className="flex items-center">de la semana</span>
              </div>
              <div className="w-4 h-4 bg-green-500 rounded-full ml-3"></div> {/* Indicador de estado */}
            </div>

            {/* Precio y cambio */}
            <div className="flex items-baseline mt-4">
              <span className="text-5xl font-bold text-gray-900">102</span>
              <span className="text-xl text-gray-600 ml-2">unidades</span>
            </div>

            {/* Timestamp */}
            <p className="text-sm text-gray-500 mt-1">
              Ultimo conteo registrado de poblacion en la region Junin
            </p>
          </div>
        </div>
      </div>
      <NavBar items={navItems} />
    </header>
  );
};