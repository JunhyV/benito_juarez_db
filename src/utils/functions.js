export async function apiCall(url) {
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

export async function apiRequest(url, datos) {
  try {
    const res = await fetch(url, { method: "POST", body: datos });
    return await res.json();
  } catch (error) {
    return error;
  }
}

export function objetoCompleto(obj) {
  const valores = Object.values(obj);
  let alerta = [];

  // Revisar campos llenos
  if (valores.includes("")) {
    alerta.push("Favor de llenar todos los campos * y al menos 1 contacto");
    return alerta;
  }

  // Revisar contactos llenos
  valores[6].forEach((contacto) => {
    if (Object.values(contacto).includes("")) {
      alerta.push(`Contacto ${contacto.id} incompleto`);    
    } else {

      //Validar telefono
      if (contacto.tel.length !== 10) {
        alerta.push('El telefono debe contener al menos 10 digitos');
      } else{

        // Validación completa
        alerta.push(`Contacto ${contacto.id} completo`);
      }
    }
  });

  return alerta;
}

export function formatoFecha(fecha) {
  const fechaArray = fecha.split("-");
  let mes;
  switch (fechaArray[1]) {
    case "01":
      mes = "ENERO";
      break;
    case "02":
      mes = "FEBRERO";
      break;
    case "03":
      mes = "MARZO";
      break;
    case "04":
      mes = "ABRIL";
      break;
    case "05":
      mes = "MAYO";
      break;
    case "06":
      mes = "JUNIO";
      break;
    case "07":
      mes = "JULIO";
      break;
    case "08":
      mes = "AGOSTO";
      break;
    case "09":
      mes = "SEPTIEMBRE";
      break;
    case "10":
      mes = "OCTUBRE";
      break;
    case "11":
      mes = "NOVIEMBRE";
      break;
    case "12":
      mes = "DICIEMBRE";
      break;
    default:
      break;
  }
  const fechaString = `${fechaArray[2]} DE ${mes} DE ${fechaArray[0]}`;
  return fechaString;
}

export function s(str) {
  return str.replace(/[&<>"']/g, (match) => {
    const escape = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return escape[match];
  });
}

export function obtenerParentesco(tipo, lista) {
    const pariente = lista.filter(parentesco => parentesco.id === tipo).shift();
    return pariente.parentesco.toUpperCase();
}