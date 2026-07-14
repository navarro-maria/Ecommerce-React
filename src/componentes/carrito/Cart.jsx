import s from './Cart.module.css'
import { useCart } from '../../context/CartContext'
import { Link } from 'react-router-dom'

function Cart() {

    const { cart, clearCart, getCartTotal, removeFromCart } = useCart();

    const finalizarCompra = () => {
        clearCart();
        alert('¡Gracias por tu compra! Tu pedido ha sido procesado.');
    }

    if (cart.length === 0) {
        return (
            <div className={s.cart}>
                <h1>Tu carrito está vacío.</h1>
                <p>Agrega productos para continuar la compra.</p>
                <Link to="/productos" className={s.btnVolver}>Ver productos</Link>
            </div>
        );
    }

    return (
        <div className={s.cart}>
            <h1>Carrito de compras</h1>

            <div className={s.cartContent}>

                <div className={s.cartItems}>
                    {cart.map(item => (
                        <div key={item.id} className={s.cartItem}>
                            <img src={item.imagen} alt={item.nombre} className={s.cartItemImage} />
                            <div className={s.cartItemDetails}>
                                <h3>{item.nombre}</h3>
                                <p>Cantidad: {item.cantidad}</p>
                                <p>Precio unitario: ${item.precio}</p>
                                <p>Subtotal: ${item.precio * item.cantidad}</p>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} className={s.btnEliminar}>
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    ))}
                </div>

                <div className={s.cartTotal}>
                    <h3>Total: ${getCartTotal()}</h3>
                    <button onClick={clearCart}>Vaciar carrito</button>
                    <Link to="/productos" className={s.btnFinalizarCompra} onClick={finalizarCompra}>
                        Finalizar compra
                    </Link>
                </div>

            </div>
        </div>
    );

}

export default Cart;