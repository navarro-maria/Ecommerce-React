import styles from './Header.module.css';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className={styles.header}>
            <Link to="/" className={styles.logo}>
                App de Mary
            </Link>
            <Navbar />
        </header>
    )
}

export default Header;