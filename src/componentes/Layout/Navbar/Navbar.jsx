import { useState } from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { useAuth } from '../../../context/AuthContext';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { getCartQuantity } = useCart();
    const totalItems = getCartQuantity();
    const { user, logout } = useAuth();

    const toggleMenu = () => setIsOpen(prev => !prev);
    const closeMenu = () => setIsOpen(false);

    const userName = user?.email?.split('@')[0] || '';

    return (
        <nav className={styles.navbar}>
            <button className={styles.hamburger} onClick={toggleMenu} aria-label="Menú">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <ul className={`${styles.links} ${isOpen ? styles.open : ''}`}>
                {user ? (
                    <>
                        <li className={styles.greeting}>¡Hola, {userName}!</li>
                        <li>
                            <button className={styles.logoutButton} onClick={() => { logout(); closeMenu(); }}>
                                Cerrar Sesión
                            </button>
                        </li>
                        {user.rol === 'admin' && (
                            <>
                                <li><Link to="/gestion" onClick={closeMenu}>Gestión</Link></li>
                                <li><Link to="/admin/cupones" onClick={closeMenu}>Cupones</Link></li>
                            </>
                        )}
                    </>
                ) : (
                    <li><Link to="/login" onClick={closeMenu}>Login</Link></li>
                )}
                <li><Link to="/productos" onClick={closeMenu}>Productos</Link></li>
                <li>
                    <Link to="/carrito" onClick={closeMenu}>
                        <i className="fa-solid fa-cart-shopping"></i>
                        {totalItems > 0 && <span className={styles.cartBadge}>{totalItems}</span>}
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
