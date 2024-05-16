import React, { useState } from "react";
import { apiRequest } from "../../utils/functions";
import { useNavigate } from "react-router-dom";

const Crear = () => {
  const [datosRegistro, setDatosRegistro] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    contraseña: "",
    contraseña2: "",
  });
  const [alertas, setAlertas] = useState("");
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit() {
    // Validar campos
    if (Object.values(datosRegistro).includes("")) {
      setAlertas("Todos los campos deben estar llenados");
      return;
    }

    // Validar contraseñas
    const { nombre, apellido, correo, contraseña, contraseña2 } = datosRegistro;

    if (contraseña !== contraseña2) {
      setAlertas("Las contraseñas deben ser iguales");
      return;
    }

    setAlertas('');
    setSpinner(true);

    // Mandar registro
    const registro = new FormData();

    registro.append("nombre", nombre);
    registro.append("apellido", apellido);
    registro.append("correo", correo);
    registro.append("contraseña", contraseña);

    const resultado = await apiRequest("/api/registro-maestros", registro);
    if (resultado.tipo === 'exito') {
        navigate('/mensaje?tipo=3');
    }
  }

  return (
    <div className="crear">
      <h1>Bienvenidos Maestr@s</h1>
      <form action="">
        <div className="form__field">
          <label htmlFor="nombre-maestro">Nombre(s):</label>
          <input
            type="text"
            id="nombre-maestro"
            className="form__input"
            value={datosRegistro.nombre}
            onChange={(e) =>
              setDatosRegistro({
                ...datosRegistro,
                nombre: e.target.value.toUpperCase(),
              })
            }
          />
        </div>
        <div className="form__field">
          <label htmlFor="apellido-maestro">Apellido(s):</label>
          <input
            type="text"
            id="apellido-maestro"
            className="form__input"
            value={datosRegistro.apellido}
            onChange={(e) =>
              setDatosRegistro({
                ...datosRegistro,
                apellido: e.target.value.toUpperCase(),
              })
            }
          />
        </div>
        <div className="form__field">
          <label htmlFor="correo-maestro">Correo:</label>
          <input
            type="email"
            id="correo-maestro"
            className="form__input"
            value={datosRegistro.correo}
            onChange={(e) =>
              setDatosRegistro({
                ...datosRegistro,
                correo: e.target.value.toUpperCase(),
              })
            }
          />
        </div>
        <div className="form__field">
          <label htmlFor="contraseña-maestro">Contraseña:</label>
          <input
            type="password"
            id="contraseña-maestro"
            className="form__input"
            onChange={(e) =>
              setDatosRegistro({ ...datosRegistro, contraseña: e.target.value })
            }
          />
        </div>
        <div className="form__field">
          <label htmlFor="contraseña2-maestro">Repetir contraseña:</label>
          <input
            type="password"
            id="contraseña2-maestro"
            className="form__input"
            onChange={(e) =>
              setDatosRegistro({
                ...datosRegistro,
                contraseña2: e.target.value,
              })
            }
          />
        </div>
        {alertas ? <p>{alertas}</p> : null}
        {spinner ? <div className="lds-dual-ring"></div> : null}
        <input
          type="button"
          value="Crear cuenta"
          className="form__submit"
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
};

export default Crear;
