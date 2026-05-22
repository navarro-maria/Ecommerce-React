import {useParams} from 'react-router-dom'
import { useEffect, useState } from 'react';
import s from './ProductDetail.module.css';

function ProductDetail() {
    const {id} = useParams();
    const [producto, setProducto] = useState(null);

    useEffect(() => {
        fetch('/data/productos.json')
            .then(respuesta => respuesta.json())
            .then(datos => {
                const productoEncontrado = datos.find(p => p.id === parseInt(id));
                setProducto(productoEncontrado);
            })
            .catch(error => console.log("Error al cargar el producto:", error));

        }, [id]);

        if (!producto) {
            return <h2>Producto no encontrado</h2>;
        }
    return (
        <div className={s.contenedor}>
            <div className={s.detalle}>
                <img className={s.imagen} src={producto.imagen} alt={producto.nombre} />
                <div className={s.info}>
                    <h2>{producto.nombre}</h2>
                    <p className={s.descripcion}>{producto.descripcion}</p>
                    <p className={s.stock}>Stock disponible: {producto.stock}</p>
                    <h3 className={s.precio}>${producto.precio}</h3>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail;