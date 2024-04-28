import Alert from "react-bootstrap/Alert";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Error.css"
const Error = () => {
  return (
    <div className="errorPage">
      <Alert variant="danger" className="cartelError">
        <WarningAmberIcon fontSize="large" />
        ERROR - PÁGINA NO ENCONTRADA
        <Link to="/">
          <Button className="botonVolver">Ir al inicio</Button>
        </Link>
      </Alert>
    </div>
  );
};

export default Error;
