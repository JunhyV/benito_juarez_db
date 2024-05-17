import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "./components/Spinner";

function App() {
  const navigate = useNavigate();

  const [curp, setCurp] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [alerta, setAlerta] = useState("");
  let quitarAlerta;

  function validarCurp(e) {
    e.preventDefault()
    if (!curp || curp.length !== 18) {
      if (quitarAlerta) {
        clearTimeout(quitarAlerta);
      }

      quitarAlerta = setTimeout(() => {
        setAlerta("");
      }, 3000);

      setAlerta("La CURP debe tener 18 caractéres.");

      quitarAlerta();
    } else {
      // Revisar si no esta registrada la curp
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
      <div className="inicial">
        <div className="inicial__container">
          <h1 className="inicial__heading">
            Escuela Primaria Benito Juárez T.V.
          </h1>
          <h2 className="inicial__heading">Ingresa la curp del alumno</h2>
          <div className="inicial__logo-contenedor">
            <img
              src="/img/370595147_122105637746018332_5528147517914913924_n.jpg"
              alt="logo"
              className="inicial__logo"
            />
          </div>

          <form action="" className="formulario" method="post">
            {alerta ? <p className="alerta__error">{alerta}</p> : null}
            <div className="formulario__field">
              <input
                type="text"
                id="curp"
                className="formulario__input"
                onChange={(e) => setCurp(e.target.value.toUpperCase().trim())}
              />
            </div>
            <button className="boton__submit" onClick={validarCurp}>
              Registrar o Actualizar {spinner ? <Spinner /> : null}
            </button>
          </form>

          <div className="link__contenedor">
            <Link to={"/iniciar-sesion"} className="link">
              Personal Administrativo
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
