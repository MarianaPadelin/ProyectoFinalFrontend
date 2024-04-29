import { useState, useEffect, useContext } from "react";
import { ItemDetail } from "./ItemDetail";
import { useParams } from "react-router-dom";
import Loader from "../../common/Loader";
import { CartContext } from "../../../context/CartContext";
import { UserContext } from "../../../context/UserContext";
import axios from "axios"

const ItemDetailContainer = () => {
  const [seleccionado, setSeleccionado] = useState({});
  const { user } = useContext(UserContext)
  const { id } = useParams();

  const { agregarProductos } = useContext(CartContext);

  const onAdd = (cantidad) => {
    let data = {
      ...seleccionado,
      quantity: cantidad,
    };

    agregarProductos(data);
  };

  useEffect(() => {
    async function getCollection(id) {
      let backendcolection = await axios.get(`/api/products/${id}`);
 
      console.log(backendcolection.data)
      return backendcolection.data.product;
    }
    getCollection(id)
      .then((elemento) => {
        setSeleccionado({
          id: elemento._id,
          img: elemento.thumbnails,
          ...elemento,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div>
      {seleccionado.id ? (
        <ItemDetail
          seleccionado={seleccionado}
          agregarProductos={agregarProductos}
          onAdd={onAdd}
          user={user}
        />
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default ItemDetailContainer;
