import { useState } from "react";
import { FormularioProducto } from "../FormularioProducto/FormularioProducto";

export function FormularioContainer() {
    const [datosForm, setDatosForm] = useState({
        nombre: '',
        precio: '',
        stock: ''
    });

    const [imagenFile, setImagenFile] = useState(null);

    const [loading, setLoading] = useState(false);

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setDatosForm({
            ...datosForm,
            [name]: value
        });
    }

    const manejarCambioImagen = (e) => {
        setImagenFile(e.target.files[0]);
    }

    const manejarEnvio = async (e) => {
        
        e.preventDefault();
        setLoading(true);

        if(!imagenFile){
            alert('Por favor, selecciona una imagen para el producto.');
            setLoading(false);
            return;
        }

        const apiKey = "085b02f0d3b3bd2e090af0a8eaf08945";
        const formData = new FormData();
        formData.append('image', imagenFile);

        try{
            console.log('Subiendo imagen a imgbb...');
            const respuestaImgbb = await 
                fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                    method: 'POST',
                    body: formData
                });

                const datosImgbb = await respuestaImgbb.json();

                if(datosImgbb.success){
                    console.log('Imagen subida exitosamente:', datosImgbb.data.url);

                    const productoCompleto = {
                        ...datosForm,
                        urlImagen: datosImgbb.data.url
                    };

                    console.log('Enviando los siguientes datos a la API:', productoCompleto);
                }else{
                    throw new Error('Error al subir la imagen a imgbb');
                }
                
        }catch(error){
            console.error('Error durante el proceso de envío:', error);
            alert('Hubo un error al subir la imagen. Por favor, intenta nuevamente.');
        }finally{
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
        />
    );
}