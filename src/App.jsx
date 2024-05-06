import { useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const [curp, setCurp] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [alerta, setAlerta] = useState("");

  function validarCurp(e) {
    if (!curp || curp.length !== 18) {
      setAlerta("La CURP debe tener 18 caracteres");
      setTimeout(() => {
        setAlerta("");
      }, 3000);
    } else {
      // Revisar si no esta registrada la curp
      setAlerta("Loading...");
      setSpinner(true);
      setTimeout(() => {
        setAlerta("");
        setSpinner(false);

        navigate(`/registro?curp=${curp}`);
      }, 3000);
    }
  }

  return (
    <>
      <div className="">
        <h1>Escuela Primaria Benito Juárez T.V.</h1>
        <h2>Ingresa la curp del alumno</h2>
        <form action="" className="form" method="post">
          {alerta ? <p>{alerta}</p> : null}
          {spinner ? <div className="lds-dual-ring"></div> : null}
          <div className="form__field">
            <input
              type="text"
              id="curp"
              className="form__input"
              onChange={(e) => setCurp(e.target.value.toUpperCase().trim())}
            />
          </div>
          <input
            type="button"
            value="Registrar alumno"
            className="form__button"
            onClick={validarCurp}
          />
        </form>
      </div>
    </>
  );
}

export default App;
