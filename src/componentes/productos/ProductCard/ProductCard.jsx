import s from './ProductCard.module.css'
import Contador from '../Contador/Contador'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export function ProductCard({ id, nombre, precio, stock, imagen }) {

    const [esFavorito, setEsFavorito] = useState(false)
    const [cantidad, setCantidad] = useState(0)

    const marcarComoFavorito = () => {
        setEsFavorito(!esFavorito)
    }

    const agregarAlCarrito = () => {
        if (cantidad === 0) {
            alert('Por favor, selecciona una cantidad antes de agregar al carrito.')
            return
        }
        alert(`Agregaste ${cantidad} unidades de ${nombre} al carrito.`)
    }

    return (
        <div className={s.contenedor}>
            <Link to={`/producto/${id}`} className={s.link}>
                <img src={imagen} alt={nombre} className={s.imagenCard} />

                <div className={s.info}>
                    <h3 className={s.nombre}>{nombre}</h3>
                    <p className={s.stock}>Stock disponible: {stock}</p>
                    <p className={s.precio}>${precio}</p>
                </div>

            </Link>

            <Contador stock={stock} cantidad={cantidad} setCantidad={setCantidad} />

            <div>
                <button className={s.boton} onClick={agregarAlCarrito}>Agregar al carrito</button>
                <span className={s.favorito} onClick={marcarComoFavorito}>
                    {esFavorito ? '❤️' : '🤍'}
                </span>
            </div>
        </div>
    )
}