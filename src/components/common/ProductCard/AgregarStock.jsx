import { Button } from "react-bootstrap";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";

export const AgregarStock = ({ id }) => {
  const agregarStock = async () => {
    await axios
      .get(`/api/products/${id}`)
      .then((res) => {
        let currentStock = res.data.product.stock;
        return currentStock;
      })
      .then((res) => {
        axios({
          method: "put",
          url: `/api/products/${id}`,
          data: {
            stock: res + 1,
          },
        });
      });
  };

  const quitarStock = async () => {
    await axios
      .get(`/api/products/${id}`)
      .then((res) => {
        let currentStock = res.data.product.stock;
        return currentStock;
      })
      .then((res) => {
        axios({
          method: "put",
          url: `/api/products/${id}`,
          data: {
            stock: res - 1,
          },
        });
      });
  };

  return (
    <div className="botonesStock">
      <Tooltip title="Añadir stock">
        <Button className="botonComprar" onClick={agregarStock}>
          +
        </Button>
      </Tooltip>

      <b>Cambiar stock</b>
      <Tooltip title="Quitar stock">
        <Button className="botonComprar" onClick={quitarStock}>
          -
        </Button>
      </Tooltip>
    </div>
  );
};
