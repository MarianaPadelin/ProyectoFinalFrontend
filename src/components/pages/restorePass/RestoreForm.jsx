import { TextField } from "@mui/material";
import { Button } from "react-bootstrap";

const RestoreForm = ({ handleChange, handleSubmit, errors}) => {
  return (
    <div className="camposFormulario">
      <p>Por favor, ingrese una nueva contraseña</p>
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
        <TextField
          placeholder="Contraseña"
          type="password"
          label="Contraseña"
          name="password"
          variant="outlined"
          error={errors.password ? true : false}
          helperText={errors.password}
          onChange={handleChange}
        />
        <TextField
          placeholder="Repita su contraseña"
          type="password"
          label="Repita su contraseña"
          name="password2"
          variant="outlined"
          error={errors.password2 ? true : false}
          helperText={errors.password2}
          onChange={handleChange}
        />

        <Button type="submit" variant="dark" size="lg" className="botonVolver">
          Enviar
        </Button>
      </form>
    </div>
  );
};

export default RestoreForm;
