import s from './Cart.module.css'

function Cart() {
    return (
        <div className={s.cart}>
            <h1>Carrito de compras</h1>
            <p>Tu carrito está vacío.</p>
        </div>
    );
}

export default Cart;