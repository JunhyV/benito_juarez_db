import React from 'react'

const Contacto = ({contacto, setContacto, parentescosAPI}) => {
    const {id, tel, parentesco} = contacto;
    
  return (
    <div className="form__field">
    <label htmlFor={`contacto-${id}`} className="form__label">Contacto {id}:</label>
    <input type="number" id={`contacto-${id}`} onChange={(e) => setContacto({...contacto, tel: e.target.value})}/>
    <select id={`contacto-${id}-parentesco`} className="form__select" value={parentesco} onChange={(e) => setContacto({...contacto, parentesco: e.target.value})}>
        <option value="" disabled>--Parentesco--</option>
        {parentescosAPI.map( tipo => <option key={tipo.id} value={tipo.id}>{tipo.parentesco.toUpperCase()}</option>)}
    </select>
</div>
  )
}

export default Contacto