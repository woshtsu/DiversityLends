import { useNavigate } from "react-router-dom";
import MyMapComponent from "./MyMapComponent";
import SpeciesSelect from "./SpeciesSelect";
import { useEffect, useState } from "react";
import axios from "axios";

export function FormPost({ value, correoShared }: { value: boolean, correoShared: string }) {
  const Navegar = useNavigate()
  const [nombre, setname] = useState('')

  const handleRec = () => {
    Navegar('/Login')
  }
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`http://localhost:1234/api/getuserdata/${correoShared}`)
        console.log(response);
        setname(response.data.nombre)
      } catch (error) {
        console.log(error)
      }
    })()
  })


  return (
    <div className="flex items-center justify-center h-full">
      <div className="bg-emerald-300 p-6 rounded-lg shadow-md w-fit space-y-4">
        {/* Tu contenido del formulario */}
        {value
          ?
          (<div className="flex justify-center items-center gap-3">
            <h1 className="mask-b-from-neutral-400 text-5xl text-pretty">Bienvenido</h1>
            {/* Imagen de perfil */}
            <img
              src="https://i.pravatar.cc/60"
              alt="Perfil"
              className="w-10 h-10 rounded-full object-cover"
            />

            {/* Nombre del usuario */}
            <span className="text-lg font-semibold text-gray-800">{nombre}</span>
          </div>)
          :
          (<div className="text-center items-center">
            <button onClick={handleRec} className="text-blue-500 hover:underline cursor-pointer border-b-black">
              Iniciar Sesión
            </button>
            <button className="text-blue-500 hover:underline pl-32 cursor-pointer">
              Registrarse
            </button>
          </div>)
        }

        <div className="flex items-center gap-2">
          <MyMapComponent />

          <div className="relative pl-10">
            <SpeciesSelect />
          </div>
        </div>

        <div>
          <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
            Descripcion del Avistamiento
          </label>
          <textarea
            id="descripcion"
            rows={4}
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
            placeholder="Avistamiento de Puma observado al atardecer en el cerro de Achkamarca"
          />
        </div>

        <div className="flex justify-between pt-2">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 active:bg-blue-700">
            Enviar Comentario
          </button>
          <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded cursor-pointer hover:bg-gray-400 active:bg-cyan-600-700">
            Ver Posts
          </button>
        </div>
      </div>
    </div>
  )
}