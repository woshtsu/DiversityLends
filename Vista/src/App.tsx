import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { ForoAcademico } from "./pages/ForoAcademico"
import { MainLayout } from "./layouts/MainLayout"
import { PageLayout } from "./layouts/PageLayout"
import { FormLogin } from "./pages/FormLogin"
import { useState } from "react"
function App() {
  const [logged, setLogged] = useState(false)
  const [email, setEmail] = useState('')

  return (
    <section>
      <BrowserRouter>
        <Routes>
          <Route path="Login" element={<FormLogin value={logged} seter={setLogged} params={{ func: setEmail }} />} />
          <Route path="/" element={<Navigate to="/page/metricas" />} />


          <Route path="/page" element={<MainLayout />}>
            <Route path="" element={<PageLayout />}>
              <Route path="metricas" element={<h1 className="text-9xl">Proximamente metricas</h1>} />
              <Route path="noticias" element={<h1 className="text-9xl">Proximamente noticias</h1>} />
              <Route path="pronostico" element={<h1 className="text-9xl">Proximamente pronostico</h1>} />
              <Route path="foro" element={<h1 className="text-9xl">Proximamente Foro</h1>} />
              <Route path="foro-academico" element={<ForoAcademico value={logged} paraShared={email} />} />
              <Route path="ubicacion" element={<h1 className="text-9xl">Proximamente Ubicacion</h1>} />
            </Route>

            <Route path="about" element={<h1>Sobre nosotros</h1>} />
            <Route path="contact" element={<p>Hola</p>} />
          </Route>

        </Routes>
      </BrowserRouter>
    </section>
  )
}

export default App
