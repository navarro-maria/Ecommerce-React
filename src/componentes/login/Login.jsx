import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import s from './Login.module.css'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setError(null);
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("Usuario logueado:", user);
                navigate('/');
            })
            .catch((error) => {
                console.error("Error en el login:", error.code, error.message);
                setError('Credenciales inválidas. Verifique sus datos.');
            });
    };

    return (
        <div>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin} className={s.form}>
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className={s.errorMessage}>{error}</p>}
                <button type="submit" className={s.boton}>Ingresar</button>
                <p>
                    ¿No tenés una cuenta?
                    <Link to="/registro"> Registrate aquí</Link></p>
            </form>
        </div>
    );
};

export default Login;