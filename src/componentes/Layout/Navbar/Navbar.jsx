import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.links}>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/productos">Productos</Link></li>
                <li><Link to="/alta">Nuevo producto</Link></li>
                <li><Link to="/carrito">
                    <i class="fa-solid fa-cart-shopping"></i>
                </Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;