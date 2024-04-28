import { useFormik } from "formik";
import { FormularioEditarProducto } from "./FormularioEditarProducto";
import Swal from "sweetalert2";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";

export const FormularioEditarProductoContainer = () => {
  const { user } = useContext(UserContext);
  const { pid } = useParams();
  const navigate = useNavigate()

  const buscarDatosPrevios = async () => {
    await axios
      .get(`/api/products/${pid}`)
      .then((res) => {
        let datosRecibidos = res.data.product;
        return datosRecibidos;
      })
      .catch((error) => console.log(error));
  };
  const datosPrevios = buscarDatosPrevios();

  async function getForm(form) {
    await axios({
      method: "put",
      url: `/api/products/${pid}`,
      headers: { "Content-Type": "application/json" },
      data: 
         JSON.stringify({
        title: form.nombre,
        description: form.description,
        price: form.price,
        code: form.code,
        category: form.category,
        stock: form.stock,
        thumbnails: [form.img, form.img2],
        owner: user.email,
      }),
      
    })
      .then(() => {
        navigate("/")
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const { handleChange, handleSubmit } = useFormik({
    initialValues: {
      nombre: datosPrevios.title,
      tamaño: "",
      stock: datosPrevios.stock,
      price: datosPrevios.price,
      peso: datosPrevios.code,
      category: datosPrevios.category,
      description: datosPrevios.description,
      //   img: datosPrevios.thumbnails[0],
      //   img2: datosPrevios.thumbnails[1],
    },
    onSubmit: (info) => {
      Swal.fire({
        title: "¿Modificar el producto?",
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
            text: "Producto editado",
            icon: "success",
            background: "lightGrey",
            confirmButtonColor: "cadetBlue",
          });
        }
      });
    },
  });

  
  return (
    <div>
      <FormularioEditarProducto
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        pid={pid}
      />
    </div>
  );
};
