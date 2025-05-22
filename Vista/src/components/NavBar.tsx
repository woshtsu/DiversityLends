import React from 'react'
import { NavLink } from 'react-router-dom';

interface NavBarProps {
  logo?: string
  height?: number
  items?: Array<{
    label: string
    href: string
  }>
  isButton?: boolean
  isSearchBar?: boolean
}

export const NavBar: React.FC<NavBarProps> = ({
  logo,
  height = 60, // Default height in pixels
  items = [
    { label: 'Home', href: 'metricas' },
    { label: 'About', href: 'about' },
    { label: 'Contact', href: 'contact' }
  ],
  isButton = false,
  isSearchBar = false
}) => {
  return (
    <nav className={`h-[${height}px] w-full bg-white flex items-center px-6 shadow-md border-b border-gray-200 p-6`}>
      {/* Logo */}
      {logo && (
        <div className="flex-shrink-0 mr-6">
          <img src={logo} alt="Logo" className={`max-h-24 w-auto`} />
        </div>
      )}

      {/* Barra de búsqueda (Placeholder) */}
      {isSearchBar && <div className="flex items-center bg-gray-100 rounded-md px-3 py-1.5 mr-6">
        {/* Aquí puedes poner tu SVG de lupa */}
        <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        <input
          type="text"
          placeholder="Buscar (Ctrl+K)"
          className="bg-transparent outline-none text-sm text-gray-700 placeholder-gray-500 w-48"
        />
      </div>}

      {/* Items de navegación */}
      <div className="flex gap-5 text-sm font-medium text-gray-700">
        {items.map((item, index) => {
          return (
            <NavLink
              key={index}
              to={item.href}
              className={({ isActive }) =>
                `hover:border-b-2 hover:border-blue-600 ${isActive ? 'border-b-2 border-blue-600 font-bold' : 'text-gray-700'}`
              }
              end={item.href === ''}
            >
              {item.label}
            </NavLink>
          );
        })}
      </div>

      {/* Iconos de la derecha y botón */}
      <div className="ml-auto flex items-center gap-4">
        {/* Placeholder para icono de usuario */}
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>

        {/* Botón "Iniciar Sesion" */}
        {isButton && <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md">
          Iniciar Sesion
        </button>}
      </div>
    </nav>
  );
};
