import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { Link } from 'react-router-dom';
import s from './Gestion.module.css';

import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const Gestion = () => {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);

    // Obtener productos desde Firebase cuando se monta el componente
    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const productosRef = collection(db, 'productos nacionales');
                const resp = await getDocs(productosRef);

                setProductos(resp.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            } catch (error) {
                console.error('Error al obtener productos', error);
                setError('Error al cargar los productos.');
            }
        };

        obtenerProductos();
    }, []);

    // Eliminar un producto de Firestore y actualizar la lista del estado
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
        if (confirmDelete) {
            try {
                const docRef = doc(db, 'productos nacionales', id);
                await deleteDoc(docRef);
                setProductos((productosPrevios) => productosPrevios.filter((producto) => producto.id !== id));
                alert('Producto eliminado correctamente');
            } catch (error) {
                console.error('Error al eliminar producto', error);
                setError('Error al eliminar el producto.');
            }
        }
    };

    return (
        <div className={s.gestionContainer}> 
            <h2>Gestión de Productos</h2>
            <Link className={`${s.boton} ${s.botonAgregar}`} to="/alta">
                Agregar Producto
            </Link>

            {error && <p>Error: {error}</p>}

            <ul className={s.productoList}>
                {productos.map((producto) => (
                    <li key={producto.id} className={s.productoItem}>
                        <p>{producto.nombre} - ${producto.precio}</p>
                        <div className={s.botones}>
                            <Link className={s.boton} to={`/editar/${producto.id}`}>Editar</Link>
                            <button className={s.boton} type="button" onClick={() => handleDelete(producto.id)}>
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Gestion;