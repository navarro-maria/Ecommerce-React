import './App.css'
import Layout from './componentes/Layout/Layout'
import HomePage from './componentes/homepage/HomePage'
import ProductListContainer from './componentes/productos/ProductListContainer/ProductListContainer'
import { FormularioContainer } from './componentes/formulario/FormularioContainer/FormularioContainer'
import Cart from './componentes/carrito/Cart'
import ProductDetail from './componentes/productos/ProductDetail/ProductDetail'
import {Routes, Route} from 'react-router-dom'

function App() {

  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route path='/' element={<HomePage />}/>
        <Route path='/productos' element={<ProductListContainer Mensaje={"Todos los productos"}/>}/>
        <Route path='/alta' element={<FormularioContainer />} />

        <Route path='/producto/:id' element={<ProductDetail />}/>
        <Route path='/carrito' element={<Cart />}/>
      </Route>
    </Routes>
  )
}

export default App
