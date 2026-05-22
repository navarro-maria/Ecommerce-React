import styles from './Header.module.css';
import Navbar from '../Navbar/Navbar';

function Header() {
    return (
        <header className={styles.header}>
            <h1 className={styles.h1}>App de Mary</h1>
            <Navbar />
        </header>
    )
}

export default Header;