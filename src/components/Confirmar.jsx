import React, { useState } from "react";
import { apiRequest, formatoFecha, obtenerParentesco, s } from "../utils/functions";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const Confirmar = ({ datos, setConfirmar, grupos, parentesco }) => {
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();
  const { nombre, apellido, curp, grupo, domicilio, nacimiento, contacto } =
    datos;
  
  const obtenerGrupo = grupos.filter((salon) => salon.id === grupo).shift();

  async function handleConfirmar() {
    setSpinner(true);

    //Sanitizar los datos
    const registro = new FormData();

    registro.append("nombre", s(nombre));
    registro.append("apellido", s(apellido));
    registro.append("curp", s(curp));
    registro.append("grupos_id", s(grupo));
    registro.append("domicilio", s(domicilio));
    registro.append("nacimiento", s(nacimiento));
    registro.append("contacto", JSON.stringify(contacto));
    
    const respuesta = await apiRequest("/api/registro-alumnos", registro);
    
    setTimeout(() => {
      // Concluir
      if (respuesta.tipo === "exito") {
        navigate("/mensaje?tipo=1");
      } else if (respuesta.tipo === "error") {
        navigate("/mensaje?tipo=2");
      }
    }, 3000);
  }
  
  return (
    <div className="confirmar">
      <div className="confirmar__container">
        <button className="boton__volver" onClick={() => setConfirmar(false)}>
          &larr; Volver
        </button>
        <h1 className="confirmar__heading">Registro</h1>
        <div className="confirmar__personal">
          <p className="confirmar__p">
            Nombre(s): <span className="confirmar__span">{nombre}</span>
          </p>
          <p className="confirmar__p">
            Apellido(s): <span className="confirmar__span">{apellido}</span>
          </p>
          <p className="confirmar__p">
            CURP: <span className="confirmar__span">{curp}</span>
          </p>
          <p className="confirmar__p">
            Grupo:{" "}
            <span className="confirmar__span">{`${obtenerGrupo.grado}° "${obtenerGrupo.grupo}"`}</span>
          </p>
          <p className="confirmar__p">
            Fecha de nacimiento:{" "}
            <span className="confirmar__span">{formatoFecha(nacimiento)}</span>
          </p>
          <h2 className="confirmar__heading">Contactos</h2>
          <p className="confirmar__p">
            Domicilio: <span className="confirmar__span">{domicilio}</span>
          </p>
          <div className="confirmar__contactos">
            {contacto.map((cnt) => (
              <div key={cnt.id} className="confirmar__contacto-card">
                <h3 className="confirmar__h3">Contacto {cnt.id}</h3>
                <p className="confirmar__p">
                  Telefono:{" "}
                  <span className="confirmar__span">
                    {cnt.tel ? cnt.tel : "-"}
                  </span>
                </p>
                <p className="confirmar__p">
                  Parentesco:{" "}
                  <span className="confirmar__span">
                    {cnt.parentesco
                      ? obtenerParentesco(cnt.parentesco, parentesco)
                      : "-"}
                  </span>
                </p>
              </div>
            ))}
          </div>
          <div className="confirmar__enviar">
            <button className="boton__submit" onClick={handleConfirmar}>
              Confirmar {spinner ? <Spinner /> : null}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmar;
