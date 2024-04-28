import { Link } from "react-router-dom";
import GroupIcon from "@mui/icons-material/Group";export const Usuarios = () => {
  return (
    <div>
      <Link to="/Usuarios" title="Administrar usuarios">
        <GroupIcon fontSize="large" />
      </Link>
    </div>
  );
};
