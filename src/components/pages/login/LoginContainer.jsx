import { useFormik } from "formik";
import Login from "./Login";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";
import { config } from "../../../config";
const LoginContainer = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const ingresarConGithub = async () => {
    window.open(
      config.backendURL
      // "https://proyectofinalbackend-production-12a7.up.railway.app/api/jwt/github",
      // "_self"
    );

    await axios
      .get(`/api/jwt/github`, { withCredentials: true })
      .then((res) => {
        console.log(res);
        setUser(res.data)
        navigate("/")
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const { handleSubmit, handleChange, errors } = useFormik({
    initialValues: {
      usuario: "",
      contraseña: "",
    },
    onSubmit: async function loginUser(form) {
      const data = await axios({
        method: "post",
        url: `/api/jwt/login`,
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({
          email: form.usuario,
          password: form.contraseña,
        }),
      });
   
      if (data.status === 202) {
        axios
          .get("/frontEndUser")
          .then((res) => {
            setUser(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
        Swal.fire({
          title: "Usuario premium conectado",
          icon: "success",
          background: "lightGrey",
          confirmButtonColor: "cadetBlue",
          timer: 5000,
        });
        return navigate("/Profile");
      }
      if (data.status === 201) {
        axios
          .get("/frontEndUser")
          .then((res) => {
            setUser(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
        Swal.fire({
          title: "Administrador conectado",
          icon: "success",
          background: "lightGrey",
          confirmButtonColor: "cadetBlue",
          timer: 5000,
        });
        return navigate("/");
      }
      if (data.status === 200) {
        axios
          .get("/frontEndUser")
          .then((res) => {
            setUser(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
        Swal.fire({
          title: "Usuario conectado",
          icon: "success",
          background: "lightGrey",
          confirmButtonColor: "cadetBlue",
          timer: 5000,
        });
        return navigate("/Profile");
      }
      Swal.fire({
        title: "Error al conectarse",
        text: "Usuario o contraseña incorrectas",
        icon: "error",
        background: "lightGrey",
        confirmButtonColor: "cadetBlue",
        timer: 5000,
      });
    },

    validateOnChange: false,
    validationSchema: Yup.object({
      usuario: Yup.string().min(5, "debe tener más de 5 caracteres"),
      contraseña: Yup.string().required(),
    }),
  });

  return (
    <Login
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      errors={errors}
      ingresarConGithub={ingresarConGithub}
    />
  );
};

export default LoginContainer;
