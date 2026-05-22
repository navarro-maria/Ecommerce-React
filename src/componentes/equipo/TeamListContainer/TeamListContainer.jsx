import { useEffect, useState } from "react";
import TeamList from "../TeamList/TeamList";
import s from './TeamListContainer.module.css'

function TeamListContainer({ Mensaje }) {
    const [equipo, setEquipo] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        fetch('/data/equipo.json')
            .then(respuesta => {
                if (!respuesta.ok) {
                    throw new Error("No se pudo cargar la información del equipo");
                }
                return respuesta.json();
            }).then(datos => {
                setEquipo(datos);
            }).catch(error => {
                setError(error.message);
            }).finally(() => {
                setCargando(false);
            })
    }, []);

    if (cargando) {
        return <p>Cargando lista de miembros del equipo...</p>
    }
    if (error) {
        return <p>Error: {error}</p>
    }

    return (
        <div className={s.contenedor}>
            <h2 className={s.subtitulo}>{Mensaje}</h2>
            <TeamList equipo={equipo} />
        </div>
    )
}

export default TeamListContainer;