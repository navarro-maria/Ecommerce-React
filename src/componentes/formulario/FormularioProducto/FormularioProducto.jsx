import s from './FormularioProducto.module.css';

export function FormularioProducto({ datosForm, manejarCambio, manejarEnvio, manejarCambioImagen, loading }) {

    return (
        <form onSubmit={manejarEnvio} className={s.formulario}>
            <h3>Agregar nuevo producto</h3>
            <div>
                <label>Nombre del producto:</label>
                <input
                    type="text"
                    placeholder="Ej: Teclado mecánico"
                    name="nombre"
                    value={datosForm.nombre}
                    onChange={manejarCambio}
                />

            </div>
            <div>
                <label>Precio:</label>
                <input
                    type="number"
                    placeholder="Ej: 95"
                    name="precio"
                    value={datosForm.precio}
                    onChange={manejarCambio}
                />
            </div>
            <div>
                <label>Stock:</label>
                <input
                    type="number"
                    placeholder="Ej: 5"
                    name="stock"
                    value={datosForm.stock}
                    onChange={manejarCambio}
                />
            </div>
            <div>
                <label>Imagen:</label>
                <input
                    type="file"
                    name="imagen"
                    value={datosForm.imagen}
                    onChange={manejarCambioImagen}
                />
            </div>
            <button className={s.boton} type="submit" disabled={loading}>
                {loading ? 'Enviando...' : 'Agregar producto'}
            </button>
        </form>
    )
}