import { useState } from "react";
import s from './Contador.module.css'

function Contador({ stock, cantidad, setCantidad }) {
    const incrementar = () => {
        if (cantidad < stock) {
            setCantidad(cantidad + 1)
        }
    }
    const decrementar = () => {
        if (cantidad > 0) {
            setCantidad(cantidad - 1)
        }
    }

    return (
        <div className={s.cantidad}>
            <p>Cantidad: </p>
            <button className={s.btnCant} onClick={decrementar}>-</button>
            <p className={s.numCant}>{cantidad}</p>
            <button className={s.btnCant} onClick={incrementar}>+</button>
        </div>
    )
}

export default Contador;