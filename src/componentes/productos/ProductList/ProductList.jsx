import { ProductCard } from "../ProductCard/ProductCard";
import s from './ProductList.module.css'

function ProductList({ productos }) {
    return (
        <div className={s.contenedor}>
            {productos.map(producto => (
                <ProductCard key={producto.id}  {...producto} />
            ))}
        </div>
    )
}

export default ProductList;