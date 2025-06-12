import { useState } from 'react';
import {Map, Marker} from 'pigeon-maps';

const MyMapComponent = () => {
  // Estado para almacenar las coordenadas
  const [position, setPosition] = useState<[number, number]>([-12.0463, -77.0428]); // Lima por defecto

  // Función para obtener la ubicación actual
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition([latitude, longitude]);
        },
        (error) => {
          alert('No se pudo obtener tu ubicación: ' + error.message);
        }
      );
    } else {
      alert('Tu navegador no soporta geolocalización');
    }
  };

  return (
    <div className='flex flex-col space-y-4 items-center'>
      {/* Botón para obtener ubicación */}
      <button
        onClick={getCurrentLocation}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 max-w-44 cursor-pointer"
      >
        Usar mi ubicación actual
      </button>

      {/* Mapa */}
      <Map
        center={position}
        zoom={17}
        height={150}
        width={200}
      >
        <Marker anchor={position} />
      </Map>
    </div>
  );
};

export default MyMapComponent;