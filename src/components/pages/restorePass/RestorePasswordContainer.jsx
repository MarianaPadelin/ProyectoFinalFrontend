// import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { useFormik } from "formik";
import RestorePassword from "./RestorePassword";
import axios from "axios"

const RestorePasswordContainer = () => {
  //   const navigate = useNavigate();

  const { handleSubmit, handleChange, errors } = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async function restorePassword(form) {
          Swal.fire({
            title: "Enviando email",
            text: "Este proceso puede tardar unos segundos",
            icon: "info",
            background: "lightGrey",
            confirmButtonColor: "cadetBlue",
            timer: 5000,
          });
        await axios({
          method: "post",
          url: `/api/users/sendEmailToReset`,
          headers: {},
          data: {
            email: form.email,
          },
        })
        .then((res) => {
            if(res.status === 200){
                 Swal.fire({
                   title: "Email enviado",
                   text: "Siga los pasos indicados en el correo que le enviamos",
                   icon: "success",
                   background: "lightGrey",
                   confirmButtonColor: "cadetBlue",
                   timer: 5000,
                 });
            }

        })
        .catch((error) => {
            console.log(error)
        })
    
    },

    validateOnChange: false,
    validationSchema: Yup.object({
      email: Yup.string().required(),
    }),
  });

  return (
    <div>
      <RestorePassword
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        errors={errors}
      />
    </div>
  );
};

export default RestorePasswordContainer;
