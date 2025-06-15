import { useState } from "react";
import { Card } from "../components/form/Card.tsx";
import { Label } from "../components/form/Label.tsx";
import { Button } from "../components/form/ButtonComponent.tsx";
import { Input } from "../components/form/Input.tsx";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

type ResTypes = {
  isRegister: boolean
}

type ParamsTypes = {
  value: boolean,
  seter: React.Dispatch<React.SetStateAction<boolean>>
  params: {
    func: React.Dispatch<React.SetStateAction<string>>
  }
}

interface FormElements extends HTMLFormControlsCollection {
  usernameInput: HTMLInputElement;
}

interface UsernameFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export const FormLogin: React.FC<ParamsTypes> = ({ value, seter, params }) => {
  const navegar = useNavigate()
  const [correo, setEmail] = useState("")
  const [contraseña, setPassword] = useState("")



  const handleSubmit = async (e: React.FormEvent<UsernameFormElement>) => {

    e.preventDefault()
    console.log("Datos enviados:", { correo, contraseña })
    try {
      const response = await axios.post(
        'http://localhost:1234/api/validar',
        { correo, contraseña },
      )

      // Axios ya parsea el JSON automáticamente si es válido
      const data: ResTypes = response.data;
      seter(data.isRegister)
      if (value) params.func(correo)

    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          if (error.response.status === 401 || error.response.status === 400) {
            console.error('Error de credenciales');
          } else {
            console.error(`Error ${error.response.status}:`, error.response.data);
          }
        } else if (error.request) {
          console.error('No se recibió respuesta del servidor:', error.request);
        } else {
          console.error('Error al configurar la solicitud:', error.message);
        }
      } else {
        console.error("Hubo un error al enviar los datos:", error);
      }
    }
    console.log(value)
    if (value == true) {
      navegar('/')
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card>
        <h1 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit}>
          <div className="gap-4 p-4">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@correo.com"
              value={correo}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="gap-4 p-4">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={contraseña}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit">Entrar</Button>
        </form>
      </Card>
    </section>
  );
}