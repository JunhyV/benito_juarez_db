import React from "react";

const Contacto = ({ contactoID, datos, setDatos, parentescosAPI }) => {
  const contacto = datos.contacto.filter(contacto=>contacto.id === contactoID).shift();

  return (
    <div className="formulario__field">
      <label htmlFor={`contacto-${contactoID}`} className="form__label">
        Contacto {contactoID}
      </label>
      <div className="formulario__field--contacto">
        <input
          type="number"
          id={`contacto-${contactoID}`}
          value={contacto.tel}
          className="formulario__input"
          onChange={(e)=>setDatos(prev => ({...prev, contacto: prev.contacto.map(numero => numero.id === contactoID ? {...numero, tel: e.target.value} : numero)}))}
          placeholder="31-21-74-15-59"
        />
        <select
          id={`parentesco-${contactoID}`}
          className="formulario__select"
          value={contacto.parentesco}
          onChange={(e)=>setDatos(prev => ({...prev, contacto: prev.contacto.map(parentesco => parentesco.id === contactoID ? {...parentesco, parentesco: e.target.value} : parentesco)}))}
        >
          <option value="" disabled>
            --Parentesco--
          </option>
          {parentescosAPI.map((tipo) => (
            <option key={tipo.id} value={tipo.id}>
              {tipo.parentesco.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Contacto;
