import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormularioProducto } from "../FormularioProducto/FormularioProducto";
import { db } from "../../../firebase/config";

import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";

const datosIniciales = {
    nombre: '',
    precio: '',
    stock: '',
    categoria: '',
    descripcion: '',
    imagen: ''
};

export function FormularioContainer() {
    const [datosForm, setDatosForm] = useState(datosIniciales);
    const [imagenFile, setImagenFile] = useState(null);
    const [loading, setLoading] = useState(false);
    // Capturamos el id desde la URL para saber si estamos editando
    const { id } = useParams();
    const navigate = useNavigate();
    // Si existe id, el formulario entra en modo edición; si no, en modo alta
    const esEdicion = Boolean(id);

    useEffect(() => {
        // Si no hay id, reiniciamos el formulario para crear un producto nuevo
        if (!id) {
            setDatosForm(datosIniciales);
            setImagenFile(null);
            return;
        }

        // Si hay id, cargamos el producto desde Firestore para mostrarlo en el formulario
        const cargarProducto = async () => {
            try {
                const productoRef = doc(db, 'productos nacionales', id);
                const resp = await getDoc(productoRef);

                if (resp.exists()) {
                    const data = resp.data();
                    setDatosForm({...data});
                }
            } catch (error) {
                console.error('Error al cargar el producto', error);
                alert('No se pudo cargar el producto para editar.');
            }
        };

        cargarProducto();
    }, [id]);

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setDatosForm({
            ...datosForm,
            [name]: value
        });
    };

    const manejarCambioImagen = (e) => {
        setImagenFile(e.target.files[0]);
    };

    const manejarEnvio = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Por defecto, usamos la imagen que ya tenía el producto si estamos editando
            let imagenUrl = datosForm.imagen;

            // Si el usuario eligió una nueva imagen, la subimos a imgbb
            if (imagenFile) {
                const apiKey = "085b02f0d3b3bd2e090af0a8eaf08945";
                const formData = new FormData();
                formData.append('image', imagenFile);

                const respuestaImgbb = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                    method: 'POST',
                    body: formData
                });

                const datosImgbb = await respuestaImgbb.json();

                if (!datosImgbb.success) {
                    throw new Error('Error al subir la imagen a imgbb');
                }

                imagenUrl = datosImgbb.data.url;
            } else if (!esEdicion && !imagenUrl) {
                alert('Por favor, selecciona una imagen para el producto.');
                setLoading(false);
                return;
            }

            // Armamos el objeto del producto con los datos del formulario
            const productoCompleto = {
                ...datosForm,
                imagen: imagenUrl
            };

            // Si estamos editando, actualizamos; si no, creamos uno nuevo
            if (esEdicion) {
                const productoRef = doc(db, 'productos nacionales', id);
                await updateDoc(productoRef, productoCompleto);
                alert('Producto actualizado correctamente');
            } else {
                const productosCollection = collection(db, 'productos nacionales');
                await addDoc(productosCollection, productoCompleto);
                alert('Producto agregado correctamente');
            }

            navigate('/gestion');
        } catch (error) {
            console.error('Error durante el proceso de envío:', error);
            alert('Hubo un error al guardar el producto. Por favor, intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <FormularioProducto
            datosForm={datosForm}
            manejarCambio={manejarCambio}
            manejarEnvio={manejarEnvio}
            manejarCambioImagen={manejarCambioImagen}
            loading={loading}
            esEdicion={esEdicion}
            onCancelar={() => navigate('/gestion')}
        />
    );
}