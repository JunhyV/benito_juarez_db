import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Icon from '../../components/Icon'

const Mensaje = () => {
  const [searchParams] = useSearchParams();
  const getTipo = searchParams.get("tipo");
  const [tipo, setTipo] = useState(getTipo);
  const [mensaje, setMensaje] = useState({});

  if (!tipo) {
    setTipo("0");
  }

  useEffect(() => {
    switch (tipo) {
      case "0":
        setMensaje({
          titulo: "Acceso Denegado",
          mensaje: "Lo sentimos, no tienes permiso para acceder a esta página.",
          img: "/public/img/circle-exclamation-solid.svg",
        });
        break;
      case "1":
        setMensaje({
          titulo: "¡Registro exitoso!",
          mensaje:
            "El registro de datos en la base de alumnos se ha completado con éxito. Gracias por actualizar tu información.",
        });
        break;
      case "2":
        setMensaje({
          titulo: "¡Error en el registro!",
          mensaje:
            "No se ha podido completar el registro de tus datos. Lamentamos el inconveniente, intente más tarde.",
        });
        break;
      case "3":
        setMensaje({
          titulo: "¡Registro Completado!",
          mensaje:
            "¡Bienvenido a Benito Juarez DB! Tu registro se ha completado exitosamente.",
        });
        break;

      default:
        break;
    }
  }, []);

  return (
    <div className="">
      {tipo === "1" || tipo === '3' ? <Icon css={"icon--exito"} icon={faCircleCheck} /> : null}
      {tipo === "1" ? (
        <Icon css={"icon--error"} icon={faCircleExclamation} />
      ) : null}
      {mensaje ? <h1>{mensaje.titulo}</h1> : null}
      {mensaje ? <p>{mensaje.mensaje}</p> : null}
      {tipo === "3" ? <Link to='/iniciar-sesion'>Ir a Iniciar Sesión</Link> : null}
    </div>
  );
};

export default Mensaje;
