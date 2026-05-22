import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";
import s from './Layout.module.css';

function Layout() {
    return (
        <div className={s.layout}>
            <Header />
            <main className={s.main}>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout;