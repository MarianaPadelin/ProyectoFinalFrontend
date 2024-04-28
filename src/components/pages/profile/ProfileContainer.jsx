import Profile from "./Profile";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import Swal from "sweetalert2";
import LoginContainer from "../login/LoginContainer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfileContainer = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const cerrarSesion = () => {
    axios
      .get("/api/jwt/logout")
      .then((res) => {
        if (res.status === 200) {
          setUser(null)
          Swal.fire({
            title: "Se cerró la sesión",
            icon: "success",
            background: "lightGrey",
            confirmButtonColor: "cadetBlue",
            timer: 5000,
          })
        } else {
          Swal.fire({
            title: "Error al cerrar la sesión",
            icon: "error",
            background: "lightGrey",
            confirmButtonColor: "cadetBlue",
            timer: 5000,
          });
        }
      })
      .then(() => {
        return navigate("/Login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {user ? (
        <Profile user={user} cerrarSesion={cerrarSesion} />
      ) : (
        <LoginContainer />
      )}
    </div>
  );
};

export default ProfileContainer;
