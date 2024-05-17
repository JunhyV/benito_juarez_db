import React from "react";
import Contacto from "../components/Contacto";

const RegistroAlumnos = ({
  datosRegistro,
  setDatosRegistro,
  gruposAPI,
  parentescosAPI,
  alerta,
  handleSubmit,
}) => {
  return (
    <div className="registro">
      <div className="registro__container">
        <h1 className="registro__heading">Ingresa los datos del alumno</h1>
        <form action="" className="formulario">
          <div className="formulario__field">
            <label htmlFor="nombre-alumno" className="formulario__label">
              <span className="alerta__error">*</span>Nombre(s) del alumno
            </label>
            <input
              type="text"
              id="nombre-alumno"
              className="formulario__input"
              value={datosRegistro.nombre}
              onChange={(e) =>
                setDatosRegistro({
                  ...datosRegistro,
                  nombre: e.target.value.toUpperCase(),
                })
              }
            />
          </div>
          <div className="formulario__field">
            <label htmlFor="apellido-alumno" className="formulario__label">
            <span className="alerta__error">*</span>Apellido(s) del alumno
            </label>
            <input
              type="text"
              id="apellido-alumno"
              className="formulario__input"
              value={datosRegistro.apellido}
              onChange={(e) =>
                setDatosRegistro({
                  ...datosRegistro,
                  apellido: e.target.value.toUpperCase(),
                })
              }
            />
          </div>
          <div className="formulario__field">
            <label htmlFor="curp-alumno" className="formulario__label">
              CURP
            </label>
            <input
              type="text"
              id="curp-alumno"
              className="formulario__input"
              value={datosRegistro.curp}
              disabled
            />
          </div>
          <div className="formulario__field">
            <label htmlFor="nacimiento-alumno" className="formulario__label">
            <span className="alerta__error">*</span>Fecha de nacimiento
            </label>
            <input
              type="date"
              id="nacimiento-alumno"
              className="formulario__input"
              value={datosRegistro.nacimiento}
              onChange={(e) =>
                setDatosRegistro({
                  ...datosRegistro,
                  nacimiento: e.target.value,
                })
              }
            />
          </div>
          <div className="formulario__field">
            <label htmlFor="grupo-alumno"><span className="alerta__error">*</span>Seleccione el grupo</label>
            <div className="formulario__opciones">
              <select
                id="grupo-alumno"
                className="formulario__select"
                value={datosRegistro.grupo}
                onChange={(e) =>
                  setDatosRegistro({
                    ...datosRegistro,
                    grupo: e.target.value,
                  })
                }
              >
                <option value="" disabled>
                  --Grupo--
                </option>
                {gruposAPI.map((salon) => (
                  <option key={salon.id} value={salon.id}>
                    {salon.grado}° "{salon.grupo}"
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="formulario__field">
            <label htmlFor="domicilio-alumno" className="formulario__label">
            <span className="alerta__error">*</span>Domicilio
            </label>
            <input
              type="text"
              id="domicilio-alumno"
              className="formulario__input"
              placeholder="Ej. Santa Rita #83-A"
              value={datosRegistro.domicilio}
              onChange={(e) =>
                setDatosRegistro({
                  ...datosRegistro,
                  domicilio: e.target.value.toUpperCase(),
                })
              }
            />
          </div>
          <Contacto
            contactoID={1}
            datos={datosRegistro}
            setDatos={setDatosRegistro}
            parentescosAPI={parentescosAPI}
          />
          <Contacto
            contactoID={2}
            datos={datosRegistro}
            setDatos={setDatosRegistro}
            parentescosAPI={parentescosAPI}
          />
          {alerta.length !== 0 ? alerta.map((alrt, i) => 
            <p key={i} className="alerta__error">{alrt}</p>
          ) : null}
          <input
            type="button"
            onClick={handleSubmit}
            value={"Registrar Alumno"}
            className="boton__submit"
          />
        </form>
      </div>
    </div>
  );
};

export default RegistroAlumnos;
