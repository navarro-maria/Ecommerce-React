import s from './FormularioProducto.module.css';

export function FormularioProducto({ datosForm, manejarCambio, manejarEnvio, manejarCambioImagen, loading, esEdicion = false, onCancelar }) {

    return (
        <form onSubmit={manejarEnvio} className={s.formulario}>
            <h3>{esEdicion ? 'Editar producto' : 'Agregar nuevo producto'}</h3>
            <div>
                <label>Nombre del producto:</label>
                <input
                    type="text"
                    placeholder="Ej: Teclado mecánico"
                    name="nombre"
                    value={datosForm.nombre}
                    onChange={manejarCambio}
                    required
                />
            </div>
            <div>
                <label>Categoria:</label>
                <input
                    type="text"
                    placeholder="Ej: Electrónica"
                    name="categoria"
                    value={datosForm.categoria}
                    onChange={manejarCambio}
                />
            </div>
            <div>
                <label>Descripción:</label>
                <textarea
                    placeholder="Ej: Teclado mecánico con retroiluminación RGB"
                    name="descripcion"
                    value={datosForm.descripcion}
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
                    min="0"
                    required
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
                    min="0"
                    required
                />
            </div>
            <div>
                <label>Imagen:</label>
                <input
                    type="file"
                    name="imagen"
                    onChange={manejarCambioImagen}
                />
            </div>
            {esEdicion && datosForm.imagen && (
                <div className={s.imagenActual}>
                    <p>Imagen actual:</p>
                    <img src={datosForm.imagen} alt="Imagen actual del producto" style={{ width: '150px' }} />
                </div>
            )}
            <div className={s.botones}>
                <button className={s.boton} type="button" onClick={onCancelar} disabled={loading}>
                    Cancelar
                </button>
                <button className={s.boton} type="submit" disabled={loading}>
                    {loading ? (esEdicion ? 'Guardando...' : 'Enviando...') : (esEdicion ? 'Guardar cambios' : 'Agregar producto')}
                </button>

            </div>
        </form>
    );
}