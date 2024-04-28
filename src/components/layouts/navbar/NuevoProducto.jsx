import { Link } from "react-router-dom";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
export const NuevoProducto = () => {
  return (
    <div>
      <Link to="/NuevoProducto" title="Añadir producto">
        <NoteAddOutlinedIcon fontSize="large"/>
      </Link>
    </div>
  );
};
