import { TeamMemberCard } from "../TeamMemberCard/TeamMemberCard";
import s from './TeamList.module.css'

function TeamList({ equipo }) {
    return (
        <div className={s.contenedor}>
            {equipo.map(miembro => (
                <TeamMemberCard key={miembro.id} {...miembro} />
            ))}
        </div>
    )
}

export default TeamList;