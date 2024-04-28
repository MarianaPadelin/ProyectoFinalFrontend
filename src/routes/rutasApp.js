import { ItemListContainer } from "../components/pages/ItemList/ItemListContainer"
import CarritoContainer from "../components/pages/carrito/CarritoContainer";
import CheckoutContainer from "../components/pages/checkout/CheckoutContainer";
import { ContactoContainer } from "../components/pages/contacto/ContactoContainer"
import { FirebaseAuth } from "../components/pages/firebaseAuth/FirebaseAuth";
import { FormularioEditarProductoContainer } from "../components/pages/formularioEditarProducto/FormularioEditarProductoContainer";
import { FormularioNuevoProductoContainer } from "../components/pages/formularioNuevoProducto/FormularioNuevoProductoContainer";
import ItemDetailContainer from "../components/pages/itemDetail/ItemDetailContainer";
import LoginContainer from "../components/pages/login/LoginContainer"
import ProfileContainer from "../components/pages/profile/ProfileContainer";
import RegisterContainer from "../components/pages/register/RegisterContainer";
import RestoreFormContainer from "../components/pages/restorePass/RestoreFormContainer";
import RestorePasswordContainer from "../components/pages/restorePass/RestorePasswordContainer"
import UsersContainer from "../components/pages/users/UsersContainer";


export const rutasApp = [
  {
    id: "home",
    path: "/",
    Element: ItemListContainer,
  },
  {
    id: "categorias",
    path: "/Categorias/:nombreCategoria",
    Element: ItemListContainer,
  },
  {
    id: "lineas",
    path: "/Linea/:nombreLinea",
    Element: ItemListContainer,
  },
  {
    id: "page",
    path: "/:page",
    Element: ItemListContainer,
  },
  {
    id: "detalle",
    path: "/DetalleProducto/:id",
    Element: ItemDetailContainer,
    auth: "premium",
  },
  {
    id: "carrito",
    path: "/Carrito",
    Element: CarritoContainer,
  },
  {
    id: "checkout",
    path: "/Checkout",
    Element: CheckoutContainer,
  },
  {
    id: "usuarios",
    path: "/Usuarios",
    Element: UsersContainer,
  },
  {
    id: "contacto",
    path: "/contacto",
    Element: ContactoContainer,
  },
  // {
  //   id: "search",
  //   path: "/Searchbar",
  //   Element: SearchBarContainer,
  // },
  {
    id: "nuevo",
    path: "/NuevoProducto",
    Element: FormularioNuevoProductoContainer,
  },
  {
    id: "edit",
    path: "/editProduct/:pid",
    Element: FormularioEditarProductoContainer,
  },
  {
    id: "login",
    path: "/Login",
    Element: LoginContainer,
  },
  {
    id: "register",
    path: "/Register",
    Element: RegisterContainer,
  },
  {
    id: "restore",
    path: "/RestorePassword",
    Element: RestorePasswordContainer,
  },
  {
    id: "restoreForm",
    path: "/RestoreForm/:token",
    Element: RestoreFormContainer,
  },
  {
    id: "profile",
    path: "/Profile",
    Element: ProfileContainer,
  },
  {
    id: "firebase-auth",
    path: "/firebase-auth",
    Element: FirebaseAuth,
  },
];

