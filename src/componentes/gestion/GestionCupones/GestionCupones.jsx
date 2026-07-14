import { useState, useEffect } from 'react';
import { db } from '../../../firebase/config';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import s from './GestionCupones.module.css';

const GestionCupones = () => {
    const [cupones, setCupones] = useState([]);
    const [codigo, setCodigo] = useState('');
    const [porcentaje, setPorcentaje] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const obtenerCupones = async () => {
            try {
                const cuponesRef = collection(db, 'cupones');
                const resp = await getDocs(cuponesRef);
                setCupones(resp.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            } catch (error) {
                console.error('Error al obtener cupones', error);
                setError('Error al cargar los cupones.');
            }
        };
        obtenerCupones();
    }, []);

    const manejarEnvio = async (e) => {
        e.preventDefault();
        setError(null);
        if (!codigo.trim() || !porcentaje) return;

        try {
            const cuponesRef = collection(db, 'cupones');
            await addDoc(cuponesRef, { codigo: codigo.trim(), porcentaje: Number(porcentaje) });
            setCodigo('');
            setPorcentaje('');
            const resp = await getDocs(cuponesRef);
            setCupones(resp.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        } catch (error) {
            console.error('Error al crear cupón', error);
            setError('Hubo un error al crear el cupón.');
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este cupón?');
        if (confirmDelete) {
            try {
                const docRef = doc(db, 'cupones', id);
                await deleteDoc(docRef);
                setCupones((prev) => prev.filter((cupon) => cupon.id !== id));
            } catch (error) {
                console.error('Error al eliminar cupón', error);
                setError('Hubo un error al eliminar el cupón.');
            }
        }
    };

    return (
        <div className={s.gestionContainer}>
            <h2>Gestión de Cupones</h2>

            {error && <p className={s.errorMessage}>{error}</p>}

            <form onSubmit={manejarEnvio} className={s.formulario}>
                <h3>Crear nuevo cupón</h3>
                <div>
                    <label>Código del cupón:</label>
                    <input
                        type="text"
                        placeholder="Ej: DESCUENTO10"
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Porcentaje de descuento:</label>
                    <input
                        type="number"
                        placeholder="Ej: 15"
                        value={porcentaje}
                        onChange={(e) => setPorcentaje(e.target.value)}
                        min="0"
                        max="100"
                        required
                    />
                </div>
                <button className={s.boton} type="submit">Agregar cupón</button>
            </form>

            <ul className={s.lista}>
                {cupones.map((cupon) => (
                    <li key={cupon.id} className={s.item}>
                        <p><strong>{cupon.codigo}</strong> - {cupon.porcentaje}% de descuento</p>
                        <button className={s.boton} type="button" onClick={() => handleDelete(cupon.id)}>
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GestionCupones;
