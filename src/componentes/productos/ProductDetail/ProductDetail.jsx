import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import s from './ProductDetail.module.css';

import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase/config';

function ProductDetail() {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            const docRef = doc(db, 'productos nacionales', id);

            getDoc(docRef)
                .then((resp) => {
                    if (resp.exists()) {
                        setProducto({ ...resp.data(), id: resp.id });
                    } else {
                        setError("No se encontró el producto con el ID especificado.");
                    }
                }).catch((error) => { setError(error.message); });
        }
    }, [id]);

    if (error) {
        return <p>Error: {error}</p>
    }

    return (
        <>
            <Link to="/productos" className={s.botonVolver}>Volver a Productos</Link>
            <div className={s.contenedor}>
                {producto ? (
                    <div className={s.detalle}>
                        <img className={s.imagen} src={producto.imagen} alt={producto.nombre} />
                        <div className={s.info}>
                            <h2>{producto.nombre}</h2>
                            <p className={s.descripcion}>{producto.descripcion}</p>
                            <p className={s.stock}>Stock disponible: {producto.stock}</p>
                            <h3 className={s.precio}>${producto.precio}</h3>
                        </div>
                    </div>
                ) : (
                    <p>Cargando producto...</p>
                )}
            </div>
        </>
    )
}

export default ProductDetail;