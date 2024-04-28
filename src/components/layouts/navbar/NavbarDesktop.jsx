import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { categorias } from "../../../routes/categorias.js";
import { Link } from "react-router-dom";
import IconoLogin from "./IconoLogin.jsx";
import { CartWidget } from "./CartWidget.jsx";
import { UserContext } from "../../../context/UserContext.jsx";
import { NuevoProducto } from "./NuevoProducto.jsx";
import { useContext } from "react";
import { Usuarios } from "./Usuarios.jsx";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";

export const NavbarDesktop = () => {
    const { user } = useContext(UserContext);
  return (
    <>
      <Nav className="me-auto">
        <Link
          to="https://proyectofinalbackend-production-12a7.up.railway.app/chat"
          title="Chat"
        >
          <ForumOutlinedIcon fontSize="large" />
        </Link>
        <NavDropdown
          style={{ paddingInline: "1vw" }}
          menuVariant="dark"
          title="Productos"
          id="basic-nav-dropdown"
        >
          {categorias.map(({ id, path, title }) => (
            <Link className="dropdown-item" key={id} to={path}>
              {title}
            </Link>
          ))}
        </NavDropdown>

        {/* <Nav.Link href="/about">Novedades</Nav.Link> */}
        <Nav.Link href="/contacto">Contacto</Nav.Link>
        <div className="iconosNavbar">
          {user !== null && user.role !== "admin" && (
            <CartWidget className="cartWidget" />
          )}

          <IconoLogin />

          {user !== null && user.role !== "user" && <NuevoProducto />}
          {user !== null && user.role === "admin" && <Usuarios />}
        </div>
      </Nav>
    </>
  );
};
