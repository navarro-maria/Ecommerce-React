import Layout from './componentes/Layout/Layout'
import HomePage from './componentes/homepage/HomePage'
import ProductListContainer from './componentes/productos/ProductListContainer/ProductListContainer'
import { FormularioContainer } from './componentes/gestion/FormularioContainer/FormularioContainer'
import Gestion from './componentes/gestion/Gestion'
import GestionCupones from './componentes/gestion/GestionCupones/GestionCupones'
import Cart from './componentes/carrito/Cart'
import ProductDetail from './componentes/productos/ProductDetail/ProductDetail'
import Login from './componentes/login/Login'
import Registro from './componentes/registro/Registro'
import ProtectedRoute from './componentes/protectedRoute/ProtectedRoute';
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/productos' element={<ProductListContainer Mensaje={"Todos los productos"} />} />
        <Route
          path='/alta'
          element={
            <ProtectedRoute rolesPermitidos={['admin']}>
              <FormularioContainer />
            </ProtectedRoute>
          } />
        <Route path='/editar/:id' element={
          <ProtectedRoute rolesPermitidos={['admin']}>
            <FormularioContainer />
          </ProtectedRoute>
        } />
        <Route
          path='/gestion'
          element={
            <ProtectedRoute rolesPermitidos={['admin']}>
              <Gestion />
            </ProtectedRoute>
          } />
        <Route
          path='/admin/cupones'
          element={
            <ProtectedRoute rolesPermitidos={['admin']}>
              <GestionCupones />
            </ProtectedRoute>
          } />
        <Route path='/producto/:id' element={<ProductDetail />} />
        <Route path='/carrito' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registro' element={<Registro />} />
      </Route>
    </Routes>
  )
}

export default App
