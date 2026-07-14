import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import s from './Registro.module.css'

const Registro = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const auth = getAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); 
        
        try {
            // Intentamos crear el nuevo usuario en Firebase y si tiene éxito, lo redirigimos a la página de inicio
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/');

        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                const quiereLoguearse = window.confirm(
                    'Este correo electrónico ya está registrado. ¿Quiere iniciar sesión?'
                );
                if (quiereLoguearse) {
                    navigate('/login');
                } else {
                    navigate('/');
                }
            } else {
                // Para cualquier otro error mostramos un mensaje genérico
                setError('Ocurrió un error al registrar el usuario. Verifique los datos e intente nuevamente.');
                console.error("Error en el registro:", error.message);
            }
        }
    };

    return (
        <div className={s.authContainer}>
            <h2>Crear una nueva cuenta</h2>

            <form onSubmit={handleSubmit} className={s.form}>
                <div className={s.formGroup}>
                    <label>Correo Electrónico</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className={s.formGroup}>
                    <label>Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Mínimo 6 caracteres"
                    />
                </div>
                {error && <p className={s.errorMessage}>{error}</p>}
                <button type="submit" className={s.boton}>Registrarse</button>
            </form>
            
        </div>
    );
};
export default Registro;