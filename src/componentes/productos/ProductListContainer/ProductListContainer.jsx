import { useEffect, useState } from "react";
import ProductList from "../ProductList/ProductList";
import s from './ProductListContainer.module.css'

//Firebase
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { db } from "../../../firebase/config";

function ProductListContainer({ Mensaje }) {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const productosDB = collection(db, "productos nacionales")
        getDocs(productosDB)
            .then((resp) => {
                setProductos(
                    resp.docs.map((doc) => {
                        return { ...doc.data(), id: doc.id }
                    })
                );
            }).catch((error) => {
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