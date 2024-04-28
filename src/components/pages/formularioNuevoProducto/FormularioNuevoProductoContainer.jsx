import { useFormik } from "formik";
import { FormularioNuevoProducto } from "./FormularioNuevoProducto";
import Swal from "sweetalert2";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 

export const FormularioNuevoProductoContainer = () => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  async function getForm(form) {
    await axios({
      method: "post",
      url: `/api/products`,
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify({
        title: form.nombre,
        description: form.description,
        price: form.price,
        code: form.code,
        category: form.category,
        stock: form.stock,
        thumbnails: [form.img, form.img2],
        owner: user.email
      }),
    })
    .catch((error) => {console.log(error)})
  }
  const { handleChange, handleSubmit } = useFormik({
    initialValues: {
      nombre: "",
      tamaño: "",
      stock: "",
      price: "",
      peso: "",
      linea: "",
      category: "",
      description: "",
      img: "",
      img2: "",
    },
    onSubmit: (info) => {
      Swal.fire({
        title: "¿Agregar el nuevo producto?",
        icon: "warning",
        showCancelButton: true,
        background: "lightGrey",
        confirmButtonColor: "cadetBlue",
        cancelButtonColor: "lightCoral",
        confirmButtonText: "Agregar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          getForm(info);
          Swal.fire({
            title: "Listo",
            text: "Producto agregado",
            icon: "success",
            background: "lightGrey",
            confirmButtonColor: "cadetBlue",
          });
        }
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error)
      })
    },
  });



  return (
    <div>
      <FormularioNuevoProducto
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};
