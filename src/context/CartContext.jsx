import { createContext, useState, useContext } from 'react';

export const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe ser usado dentro de un CartProvider');
    }
    return context;
}

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product, cantidad) => {
        const itemInCart = cart.find(item => item.id === product.id);
        if (itemInCart) {
            const updateCart = cart.map(item =>
                item.id === product.id
                    ? { ...item, cantidad: item.cantidad + cantidad }
                    : item
            );
            setCart(updateCart);
        } else {
            setCart(prevCart => [...prevCart, { ...product, cantidad }]);
        }
    }

    const clearCart = () => {
        setCart([]);
    }

    // sirve para contar la cantidad de productos en el carrito, no la cantidad de items distintos
    const getCartQuantity = () => {
        return cart.reduce((acc, item) => acc + item.cantidad, 0);
    }

    // sirve para calcular el precio total del carrito, multiplicando la cantidad de cada producto por su precio y sumando todos los resultados
    const getCartTotal = () => {
        return cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    }

    const removeFromCart = (productId) => {
        const updatedCart = cart.filter(item => item.id !== productId);
        setCart(updatedCart);
    }

    const isInCart = (productId) => {
        return cart.some(item => item.id === productId);
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, clearCart, getCartQuantity, getCartTotal, removeFromCart, isInCart }}>
            {children}
        </CartContext.Provider>
    );
}
