import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Admin from "./Admin/Admin";
import SignIn from "./Admin/SignIn";
import LayoutAdmin from "./Admin/LayoutAdmin";
import Crear from "./Admin/Crear";
import Registro from "./pages/Registro";
import Error from "./pages/Error";
import Mensaje from "./pages/Mensaje";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/mensaje", element: <Mensaje /> },
  {
    path: "/registro",
    element: <Registro />,
    errorElement: <Error />,
  },
  {
    path: "/iniciar-sesion",
    element: <SignIn/>,
    errorElement: <Error />,
  },
  {
    path: "/crear-cuenta",
    element: <Crear/>,
    errorElement: <Error />,
  },
  {
    path: '/admin',
    element: <LayoutAdmin/>,
    children: [
      {
        index: true,
        element: <Admin/>
      }
    ]
  }

]);

export default router;
