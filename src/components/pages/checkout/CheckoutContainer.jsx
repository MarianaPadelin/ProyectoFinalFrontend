import { useFormik } from "formik";
import Checkout from "./Checkout";
import * as Yup from "yup";
import { CartContext } from "../../../context/CartContext";
import { useContext, useState } from "react";
import CompraExitosa from "./CompraExitosa";
import Swal from "sweetalert2";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";

const CheckoutContainer = () => {
  const { user } = useContext(UserContext);

  let userEmail = "";
  let nombreUsuario = "";
  let cid = "";

  if (user) {
    userEmail = user.email;
    nombreUsuario = user.name;
    cid = user.cart;
  }

  const { totalPrecio, limpiarCarrito } = useContext(CartContext);
  totalPrecio();
  const [ordenID, setOrdenID] = useState(null);
  const { handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      direccion: "",
      telefono: "",
    },
    //infoDelComprador son los initialValues con la info ya completada por el usuario
    onSubmit: () => {
      const Toast = Swal.mixin({
        toast: true,
        position: "center",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,

        color: "cadetBlue",
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "info",
        title: "Preparando la compra",
      });

      axios
        .post(`/api/carts/${cid}/purchase`)

        .then((res) => setOrdenID(res.data.result._id))
        .then(() => {
          limpiarCarrito();
        })
        .catch((err) => console.log("error llamando a la función" + err));
    },

    validateOnChange: false,
    validateOnBlur: true,

    validationSchema: Yup.object({
      direccion: Yup.string()
        .required("Campo requerido")
        .min(5, "Debe tener al menos 5 caracteres"),
      telefono: Yup.string().required("Campo requerido"),
    }),
  });

  return (
    <div>
      {ordenID ? (
        <CompraExitosa ordenID={ordenID} />
      ) : (
        <Checkout
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          errors={errors}
          nombreUsuario={nombreUsuario}
          userEmail={userEmail}
        />
      )}
    </div>
  );
};

export default CheckoutContainer;
