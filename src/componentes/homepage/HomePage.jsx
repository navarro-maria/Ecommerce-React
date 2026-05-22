import ProductListContainer from "../productos/ProductListContainer/ProductListContainer";
import s from './HomePage.module.css'

function HomePage() {

    return (
        <div className={s.contenedor}>
            <h1 className={s.titulo}>Bienvenidos a Nuestra Tienda</h1>
            <p className={s.descripcion}>Descubre nuestra amplia selección de productos de calidad.</p>

            <ProductListContainer Mensaje={"Productos destacados"} />
        </div>
    );
}

export default HomePage;