/**
 * App.jsx
 * Raíz de la aplicación: Router, Header, páginas y Footer.
 */
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import SorteoDetail from './pages/SorteoDetail'
import Privacidad from './pages/Privacidad'
import Terminos from './pages/Terminos'
import Quinielas from './pages/Quinielas'
import OtrosSorteos from './pages/OtrosSorteos'
import Loterias from './pages/Loterias'

const ScrollToTop = () => {
  const { pathname, search } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname, search])
  return null
}

const App = () => (
  <BrowserRouter>
    <ScrollToTop />
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sorteo/:sorteoId" element={<SorteoDetail />} />
          <Route path="/privacidad" element={<Privacidad />} />
          <Route path="/terminos" element={<Terminos />} />
          <Route path="/quinielas" element={<Quinielas />} />
          <Route path="/otros-sorteos" element={<OtrosSorteos />} />
          <Route path="/loterias" element={<Loterias />} />
        </Routes>
      </div>
      <Footer />
    </div>
  </BrowserRouter>
)

export default App
