import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";

export const EditarProducto = ({ id }) => {
  const navigate = useNavigate()

  return (
    <div>
      <Tooltip title="Editar producto">
        <IconButton
          onClick={() => {
            navigate(`/editProduct/${id}`);
          }}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};
