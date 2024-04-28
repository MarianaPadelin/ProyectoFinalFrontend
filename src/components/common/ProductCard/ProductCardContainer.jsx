import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";

const ProductCardContainer = () => {
  const { id } = useParams();

  const { agregarProductos, cantidad } = useContext(CartContext);
  const cantidadDeProductos = cantidad(id);

  const onAdd = (elemento, cantidad) => {
    let data = {
      ...elemento,
      quantity: cantidad,
    };

    agregarProductos(data);
  };
  return (
    <ProductCard cantidadDeProductos={cantidadDeProductos} onAdd={onAdd} />
  );
};

export default ProductCardContainer;
