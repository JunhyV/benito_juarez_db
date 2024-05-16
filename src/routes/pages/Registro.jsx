import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { apiCall, objetoCompleto } from "../../utils/functions";
import Confirmar from "../../components/Confirmar";
import Error from "./Error";
import RegistroAlumnos from "../../components/RegistroAlumnos";

const Registro = () => {
  const [searchParams] = useSearchParams();
  const getCURP = searchParams.get("curp");

  if (getCURP === null) {
    const error = {
      mensaje: "Hubo un error, para acceder al registro es necesaria la curp",
      ruta: "/",
    };
    return <Error error={error} />;
  }

  if (getCURP.length !== 18) {
    const error = {
      mensaje:
        "La curp ingresada no es válida, por favor, verifique la información",
      ruta: "/",
    };
    return <Error error={error} />;
  }

  // Información de registros
  const [datosRegistro, setDatosRegistro] = useState({
    nombre: "",
    apellido: "",
    curp: "",
    nacimiento: "",
    grupo: "",
    domicilio: "",
    contacto: [
      { id: 1, tel: "", parentesco: "" },
      { id: 2, tel: "", parentesco: "" },
    ],
  });

  // Información Validación
  const [alerta, setAlerta] = useState([]);
  const [confirmar, setConfirmar] = useState(false);

  // Información obtenida
  const [gruposAPI, setGruposAPI] = useState([]);
  const [parentescosAPI, setParentescosAPI] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Api´s
      const getGrupos = await apiCall("/api/grupos");
      const getParentescos = await apiCall("/api/parentescos");

      // Set data
      if (getGrupos) {
        setGruposAPI(getGrupos);
      }
      if (getParentescos) {
        setParentescosAPI(getParentescos);
      }
    };
    fetchData();
    setDatosRegistro({ ...datosRegistro, curp: getCURP });
  }, []);

  const handleSubmit = () => {
    const validacion = objetoCompleto(datosRegistro);
    setAlerta(validacion);

    if (
      Object.values(validacion).includes("Contacto 1 completo") ||
      Object.values(validacion).includes("Contacto 2 completo")
    ) {
      // Revisar si el otro campo esta lleno
      if (Object.values(validacion).includes("Contacto 1 completo")) {
        const contacto2 = datosRegistro.contacto[1];
        if (contacto2.tel.length !== 10 || contacto2.parentesco.length === 0) {
          // Reset datos
          setDatosRegistro((prev) => ({
            ...prev,
            contacto: prev.contacto.map((contacto) =>
              contacto.id === contacto2.id
                ? { id: 2, tel: "", parentesco: "" }
                : contacto
            ),
          }));
        }
      } else {
        const contacto1 = datosRegistro.contacto[0];
        if (contacto1.tel.length !== 10 || contacto1.parentesco.length === 0) {
          // Reset datos
          setDatosRegistro((prev) => ({
            ...prev,
            contacto: prev.contacto.map((contacto) =>
              contacto.id === contacto1.id
                ? { id: 2, tel: "", parentesco: "" }
                : contacto
            ),
          }));
        }
      }
      // Reset alertas y confirmar datos
      setAlerta([]);
      setConfirmar(true);
    }
  };
  return (
    <>
      {confirmar ? (
        <Confirmar
          datos={datosRegistro}
          setConfirmar={setConfirmar}
          grupos={gruposAPI}
          parentesco={parentescosAPI}
        />
      ) : (
        <RegistroAlumnos
          datosRegistro={datosRegistro}
          setDatosRegistro={setDatosRegistro}
          gruposAPI={gruposAPI}
          parentescosAPI={parentescosAPI}
          handleSubmit={handleSubmit}
          alerta={alerta}
        />
      )}
    </>
  );
};

export default Registro;
