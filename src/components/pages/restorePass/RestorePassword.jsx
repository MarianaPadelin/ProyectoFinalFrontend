import { TextField } from "@mui/material";
import { Button } from "react-bootstrap";
import "./RestorePassword.css";
// import { Link } from "react-router-dom";

const RestorePassword = ({ handleSubmit, handleChange, errors }) => {
  return (
    <div className="camposFormulario">
      <p>
        Por favor, ingrese su dirección de email y le enviaremos un correo para reestablecer
        su contraseña
      </p>
      <form className="camposLogin" onSubmit={handleSubmit}>
        <TextField
          placeholder="Email"
          label="Email"
          name="email"
          variant="outlined"
          error={errors.email ? true : false}
          helperText={errors.email}
          onChange={handleChange}
        />

        <Button type="submit" variant="dark" size="lg" className="botonVolver">
          Enviar
        </Button>
      </form>
    </div>
  );
};

export default RestorePassword;
