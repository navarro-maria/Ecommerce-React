import s from './TeamMemberCard.module.css'
import { useState } from 'react'

export function TeamMemberCard({ nombre, foto, puesto, email }) {
    return (
        <div className={s.contenedor}>
            <img
                className={s.imagen}
                src={foto}
                alt={nombre} />
            <div className={s.datos}>
                <h3>{nombre}</h3>
                <h4>{puesto}</h4>
                <p>{email}</p>
            </div>
        </div>
    )
}