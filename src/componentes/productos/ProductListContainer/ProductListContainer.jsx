import { useEffect, useState } from "react";
import ProductList from "../ProductList/ProductList";
import s from './ProductListContainer.module.css'

function ProductListContainer({ Mensaje }) {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        fetch('/data/productos.json')
            .then(respuesta => {
                if (!respuesta.ok) {
                    throw new Error("No se pudo cargar la información de los productos");
                }
                return respuesta.json();
            }).then(datos => {
                setProductos(datos);
            }).catch(error => {
                setError(error.message);
            }).finally(() => {
                setCargando(false);
            })
    }, []);

    if (cargando) {
        return <p>Cargando productos...</p>
    }
    if (error) {
        return <p>Error: {error}</p>
    }

    return (
        <div className={s.contenedor}>
            <h2 className={s.subtitulo}>{Mensaje}</h2>
            <div className={s.productos}>
                <ProductList productos={productos} />
            </div>
        </div>
    )
}

export default ProductListContainer;