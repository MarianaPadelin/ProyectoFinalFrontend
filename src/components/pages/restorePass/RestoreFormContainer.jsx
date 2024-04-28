import RestoreForm from "./RestoreForm"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios"

const RestoreFormContainer = () => {
 const navigate = useNavigate()
  const { handleSubmit, handleChange, errors } = useFormik({
    initialValues: {
      email: "",
      password: "", 
      password2: ""
    },
    onSubmit: async function restorePassword(form) {
      await axios({
        method: "post",
        url: `/api/users/restoreForm`,
        headers: {},
        data: {
          email: form.email,
          password: form.password,
          repeatPassword: form.password2
        },
      })
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              title: "Contraseña actualizada con éxito",
              icon: "success",
              background: "lightGrey",
              confirmButtonColor: "cadetBlue",
              timer: 5000,
            })
            navigate("/login")
          }
         
        })
        .catch((error) => {
          if (error.response.status == 404) {
            Swal.fire({
              title: "Email no registrado",
              text: "El email no está registrado",
              icon: "error",
              background: "lightGrey",
              confirmButtonColor: "cadetBlue",
              timer: 5000,
            });
          } else if (error.response.status === 400) {
            Swal.fire({
              title: "Error actualizando la contraseña",
              text: "Verifique que la contraseña sea distinta a la anterior",
              icon: "error",
              background: "lightGrey",
              confirmButtonColor: "cadetBlue",
              timer: 5000,
            });
          } else if (error.response.status === 401) {
            Swal.fire({
              title: "Error actualizando la contraseña",
              text: "Verifique que ambas contraseñas sean iguales",
              icon: "error",
              background: "lightGrey",
              confirmButtonColor: "cadetBlue",
              timer: 5000,
            });
          } else {
            Swal.fire({
              title: "Error actualizando la contraseña",
              text: "Inténtelo nuevamente",
              icon: "error",
              background: "lightGrey",
              confirmButtonColor: "cadetBlue",
              timer: 5000,
            });
          }
        });
    },

    validateOnChange: false,
    validationSchema: Yup.object({
      email: Yup.string().required(),
    }),
  });

  return (
    <div>
      <RestoreForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        errors={errors}
      />
    </div>
  );
}

export default RestoreFormContainer