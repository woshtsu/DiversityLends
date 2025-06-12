import React, { useEffect, useState } from 'react';

interface SpeciesResponse {
  especie_id: number;
  nombre_cientifico: string;
  nombre_comun: string;
  familia: string;
  categoria_id: number;
}

const SpeciesSelect: React.FC = () => {
  const [species, setSpecies] = useState<SpeciesResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const response = await fetch('http://localhost:1234/api/getAllspecies');
        console.log(response)

        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }

        const data: SpeciesResponse[] = await response.json();
        setSpecies(data);
      } catch (err) {
        setError('No se pudo cargar la lista de especies');
      } finally {
        setLoading(false);
      }
    };

    fetchSpecies();
  }, []);

  if (loading) return <p>Cargando especies...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <select className="block w-full border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200">
      <option>Seleccionar Especies</option>
      {species.map((specie) => (
        <option key={specie.especie_id} value={specie.nombre_comun}>
          {specie.nombre_comun} ({specie.familia})
        </option>
      ))}
    </select>
  );
};

export default SpeciesSelect;