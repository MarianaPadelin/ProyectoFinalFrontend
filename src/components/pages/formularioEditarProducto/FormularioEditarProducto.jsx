import { Box, TextField } from "@mui/material";
import { Button } from "react-bootstrap";

export const FormularioEditarProducto = ({ pid, handleSubmit, handleChange }) => {
  return (
    <div className="contenido">
      <h2 style={{ display: "flex", justifyContent: "center", marginTop: "3vw" }}>
        Ingresar los datos del producto {pid}
      </h2>

      <Box
        onSubmit={handleSubmit}
        component="form"
        sx={{
          "& .MuiTextField-root": {
            m: 1,
            width: "50ch",
            margin: "3vw",
            display: "flex",
            alignContent: "center",
            background: "lightgrey",
            justifyContent: "center",
          },
        }}
      >
        <TextField
          label="Nombre"
          name="nombre"
          placeholder="Nombre del producto"
          onChange={handleChange}
        />
        <TextField
          label="Stock"
          name="stock"
          placeholder="cantidad de stock"
          onChange={handleChange}
        />
        <TextField
          label="Precio"
          name="price"
          placeholder="Precio del producto"
          onChange={handleChange}
        />
        <TextField
          label="Código"
          name="code"
          placeholder="Código del producto"
          onChange={handleChange}
        />
        <TextField
          label="Categoría"
          name="category"
          placeholder="(tazas, mates, etc)"
          onChange={handleChange}
        />
        <TextField
          label="Descripción"
          name="description"
          multiline
          placeholder="Descripción del producto"
          onChange={handleChange}
        />
        <TextField
          label="Imagen 1"
          name="img"
          placeholder="URL de la imagen"
          onChange={handleChange}
        />
        <TextField
          label="Imagen 2"
          name="img2"
          placeholder="URL de la imagen"
          onChange={handleChange}
        />
        <Button className="botonVolver" type="submit" style={{marginLeft:"3vw", marginBottom: "3vh"}}>
          Enviar
        </Button>
      </Box>
    </div>
  );
};
