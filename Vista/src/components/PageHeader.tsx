import React from 'react';
import { Breadcrumb } from './Breadcrumb.tsx'; // Asegúrate de que la ruta sea correcta

export const PageHeader: React.FC = () => {
  const breadcrumbItems = [
    { label: 'Mercados', href: '#' },
    { label: 'Criptomonedas', href: '#' },
    { label: 'Bitcoin' }, // Último elemento sin enlace
  ];

  return (
    <header className="w-full bg-white p-4 shadow-md">
      <div className="container mx-auto">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        <div className="flex items-center mt-4">
          {/* Icono y Ranking */}
          <div className="flex-shrink-0 mr-4">
            <div className="relative">
              {/* Placeholder para el icono de Bitcoin */}
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                B
              </div>
              <span className="absolute bottom-0 left-0 bg-black text-white text-xs font-semibold px-2 py-1 rounded-md">
                #1
              </span>
            </div>
          </div>

          {/* Información principal */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Bitcoin</h1>

            {/* Selector de par y exchange */}
            <div className="flex items-center mt-2">
              <div className="flex items-center border rounded-md px-3 py-1 text-sm text-gray-700">
                BTCUSD
                <span className="mx-2">•</span>
                <span className="flex items-center">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-1"></span> {/* Placeholder para logo de Bitstamp */}
                  Bitstamp
                </span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
              <div className="w-4 h-4 bg-green-500 rounded-full ml-3"></div> {/* Indicador de estado */}
            </div>

            {/* Precio y cambio */}
            <div className="flex items-baseline mt-4">
              <span className="text-5xl font-bold text-gray-900">102.618</span>
              <span className="text-xl text-gray-600 ml-2">USD</span>
              <span className="text-xl font-semibold text-red-600 ml-4">-3.902</span>
              <span className="text-xl font-semibold text-red-600 ml-2">-3,66%</span>
            </div>

            {/* Timestamp */}
            <p className="text-sm text-gray-500 mt-1">
              A partir de hoy a las 01:30 GMT-5
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};