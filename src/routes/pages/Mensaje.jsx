import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import Icon from "../../components/Icon";

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
    <div className="mensaje">
      <div className="mensaje__container">
        <div className="icon__contenedor">
          {tipo === "1" || tipo === "3" ? (
            <Icon css={"icon--exito"} icon={faCircleCheck} />
          ) : (
            <Icon css={"icon--error"} icon={faCircleExclamation} />
          )}
        </div>
        {mensaje ? (
          <h1 className="mensaje__heading">{mensaje.titulo}</h1>
        ) : null}
        {mensaje ? <p className="mensaje__txt">{mensaje.mensaje}</p> : null}
        <div className="boton__contenedor">
          {tipo === "3" ? (
            <Link to="/iniciar-sesion" className="boton__volver">
              Ir a Iniciar Sesión
            </Link>
          ) : (
            <Link className="boton__volver" to="/">
              Inicio
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mensaje;
