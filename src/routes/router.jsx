import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Registro from "./Registro";
import Error from "./Error";

const router = createBrowserRouter([
  { path: "/", 
  element: <App />,
},
  {
    path: "/registro",
    element: <Registro />,
    errorElement: <Error/>
  },
]);

export default router;
