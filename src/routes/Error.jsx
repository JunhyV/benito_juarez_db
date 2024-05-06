import React from 'react'
import { Link } from 'react-router-dom';

const Error = ({error}) => {
    const {mensaje, ruta} = error;
  return (
    <div>
        <h1>Opps... ha ocurrido un error</h1>
        <p>{mensaje}</p>
        <Link to={ruta}>Volver</Link>
    </div>

  )
}

export default Error