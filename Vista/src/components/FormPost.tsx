import MyMapComponent from "./MyMapComponent";
import SpeciesSelect from "./SpeciesSelect";

export function FormPost(){

    return(
        <div className="flex items-center justify-center h-full">
          <div className="bg-white p-6 rounded-lg shadow-md w-fit space-y-4">
            {/* Tu contenido del formulario */}
            <div className="text-center items-center">
              <button className="text-blue-500 hover:underline cursor-pointer">
                Iniciar Sesión
              </button>
              <button className="text-blue-500 hover:underline pl-32 cursor-pointer">
                Registrarse
              </button>
            </div>
  
            <div className="flex items-center gap-2">
              <MyMapComponent />
  
              <div className="relative pl-10">
                <SpeciesSelect/>
              </div>
            </div>
  
            <div>
              <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
                Descripcion
              </label>
              <textarea
                id="descripcion"
                rows={4}
                className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                placeholder="Escribe algo..."
              />
            </div>
  
            <div className="flex justify-between pt-2">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Enviar Comentario
              </button>
              <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">
                Ver Comentarios
              </button>
            </div>
          </div>
        </div>
    )
}