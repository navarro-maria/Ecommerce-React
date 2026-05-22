import TeamListContainer from "../../equipo/TeamListContainer/TeamListContainer";
import s from './Footer.module.css';

function Footer() {
    return (
        <footer className={s.footer}>
            <TeamListContainer Mensaje="Nuestro equipo" />
            <p>&copy; 2026 - La app de Mary</p>
        </footer>
    )
}

export default Footer;