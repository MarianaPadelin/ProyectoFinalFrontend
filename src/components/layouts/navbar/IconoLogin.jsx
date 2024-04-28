import { Button } from "react-bootstrap";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import "./Navbar.css";

const IconoLogin = () => {
    const { user } = useContext(UserContext);
  return (
    <>
      {!user ? (
        <div>
          <Link to="/Login" title="Iniciar sesión">
            <Button
              variant="outline-dark"
              style={{ marginLeft: "auto" }}
              className="botonNav"
            >
              <LoginIcon />
            </Button>
          </Link>
        </div>
      ) : (
        <Link to="/Profile" title="Perfil">
          <Button
            variant="outline-dark"
            style={{ marginLeft: "auto" }}
            className="botonNav"
          >
            <AccountCircleIcon />
          </Button>
        </Link>
      )}
    </>
  );
}

export default IconoLogin