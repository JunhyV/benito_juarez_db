import React, { useEffect, useState } from "react";
import { useNavigate, useRouteError, useSearchParams } from "react-router-dom";
import Contacto from "../components/Contacto";
import { apiCall, objetoCompleto } from "../utils/functions";
import Error from "./Error";

const Registro = () => {
    const [searchParams] = useSearchParams();
    const getCURP = searchParams.get('curp');

    if (getCURP.length !== 18) {
        const error = {
            mensaje: 'La curp ingresada no es válida, por favor, verifique la información',
            ruta: '/',
        }
        return <Error error={error}/>
    }

    // Información de registros
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [curp, setCurp] = useState(getCURP);
    const [nacimiento, setNacimiento] = useState('');
    const [grupo, setGrupo] = useState('');
    const [domicilio, setDomicilio] = useState('');
    const [contacto1, setContacto1] = useState({id: 1, tel: '', parentesco: ''});
    const [contacto2, setContacto2] = useState({id: 2, tel: '', parentesco: ''});
    const [datosRegistro, setDatosRegistro] = useState({});
    
    // Información obtenida
    const [gruposAPI, setGruposAPI] = useState([]);
    const [parentescosAPI, setParentescosAPI] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            // Api´s
            const getGrupos = await apiCall('/api/grupos');
            const getParentescos = await apiCall('/api/parentescos');

            // Set data
            setGruposAPI(getGrupos);
            setParentescosAPI(getParentescos);
        }
        fetchData();
    }, [])

    useEffect(() => {
        setDatosRegistro({nombre, apellido, curp, nacimiento, grupo, domicilio, contacto1, contacto2})
    }, [nombre, apellido, curp, nacimiento, grupo, domicilio, contacto1, contacto2]);
    
    const handleSubmit = () => {
        objetoCompleto(datosRegistro);
    }
  return <>
  <h1>Ingresa los datos del alumno</h1>
  <form action="" className="form">
    <fieldset className="form__fieldset">
        <legend className="form__legend">Información del alumno</legend>
        <div className="form__field">
            <label htmlFor="nombre-alumno" className="form__label">Nombre(s) del alumno:</label>
            <input type="text" id="nombre-alumno" className="form__input" onChange={(e) => setNombre(e.target.value.toLocaleUpperCase())}/>
        </div>
        <div className="form__field">
            <label htmlFor="apellido-alumno" className="form__label">Apellido(s) del alumno:</label>
            <input type="text" id="apellido-alumno" className="form__input" onChange={(e) => setApellido(e.target.value.toLocaleUpperCase())}/>
        </div>
        <div className="form__field">
            <label htmlFor="curp-alumno" className="form__label">CURP</label>
            <input type="text" id="curp-alumno" className="form__input" value={curp} disabled/>
        </div>
        <div className="form__field">
            <label htmlFor="nacimiento-alumno" className="form__label">Fecha de nacimiento</label>
            <input type="date" id="nacimiento-alumno" className="form__input" onChange={(e) => setNacimiento(e.target.value)}/>
        </div>
        <div className="form__field">
            <p>Seleccione el grupo</p>
            <div className="form__opciones">
            <select id="grupo-alumno" className="form__select" value={grupo} onChange={(e) => setGrupo(e.target.value)}>
                <option value="" disabled>--Grupo--</option>
                {gruposAPI.map( salon => <option key={salon.id} value={salon.id}>{salon.grado}° "{salon.grupo}"</option>)}
            </select>
            </div>
        </div>
    </fieldset>
    <fieldset className="form_fieldset">
        <legend className="form__legend">Contactos de emergencia</legend>
        <div className="form__field">
            <label htmlFor="domicilio-alumno" className="form__label">Domicilio:</label>
            <input type="text" id="domicilio-alumno" className="form__input" onChange={(e) => setDomicilio(e.target.value.toUpperCase())} placeholder="Ej. Santa Rita #83-A"/>
        </div>
        <Contacto contacto={contacto1} setContacto={setContacto1} parentescosAPI={parentescosAPI}/>
        <Contacto contacto={contacto2} setContacto={setContacto2} parentescosAPI={parentescosAPI}/>
    </fieldset>
    <input type="button" onClick={handleSubmit} value={'Registrar Alumno'}/>
  </form>
  </>;
};

export default Registro;
