import { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

//creo el contexto
export const CartContext = createContext();

//creo un componente que va a ser el proveedor del contexto
export const CartContextProvider = ({ children }) => {
  const { user } = useContext(UserContext);

  const [cart, setCart] = useState([]);
  const navigate = useNavigate()
  
  useEffect(() => {
    if (!user) {
      return setCart([]);
    }

    let cid = user.cart;

    axios
      .get(`/users/cart/${cid}`)
      .then((res) => {
        let cartFound = res.data.products;


        return setCart(cartFound);
      })
      .catch((error) => {
        console.log(error);
      });
    //lo que ponga en el array va a ser la accion del disparador de useEffect
  }, [user, setCart]);


  const agregarProductos = async (nuevo) => {
    if(user){
      let cid = user.cart;
      let cantidad = nuevo.quantity;
      await axios
        .post(`/api/carts/${cid}/product/${nuevo.id}`, { cantidad })
        //no le estoy pasando la cantidad como parametro (nuevo.quantity)

        .then(async () => {
          let result = await axios.get(`/api/carts/${cid}`);
          let cartWithProduct = result.data.cart.products;
          setCart(cartWithProduct);
        })
        .then(() => {
            const Toast = Swal.mixin({
              toast: true,
              position: "center",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,

              color: "cadetBlue",
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });
            Toast.fire({
              icon: "success",
              title: "El producto se agregó al carrito",
            });
        })
        .catch((error) => {
          console.log(error);
        });

    } else {
      
      navigate("/login")
    }
    
    
  };


  const limpiarCarrito = () => {

    if (user) {
      let cid = user.cart;
      axios.delete(`/api/carts/${cid}`).then((res) => setCart(res));
    }
  };

  const eliminarElemento = (pid) => {
    if (user) {
      let cid = user.cart;
      axios
        .delete(`/api/carts/${cid}/product/${pid}`)
        .then(async () => {
          let result = await axios.get(`/api/carts/${cid}`);
          let cartWithProduct = result.data.cart.products;
          setCart(cartWithProduct);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  
  const totalElementos = () => {
    if (user && cart) {
      if (cart.length > 0) {
        let total = cart.reduce((acc, elemento) => {
          return acc + elemento.quantity;
        }, 0);
        return total;
      } else return 0;
    }
  };

  const totalPrecio = () => {
    if (user && cart && cart.length > 0) {
      let total = cart.reduce((acc, elemento) => {
        return acc + elemento._id.price * elemento.quantity;
      }, 0);
      return total;
    } else return 0;
  };

  const precioConDescuento = () => {
    let totalDescuento = totalPrecio() * 0.9;
    return totalDescuento;
  };

  const totalPeso = () => {
    //tengo que agregar el peso del producto en la db
    let total = 6;
    // let total = cart.reduce((acc, elemento) => {
    //   return acc + elemento.peso * elemento.quantity;
    // }, 0);
    return total;
  };

  //el costo de envío está basado en el costo de las encomiendas de Correo Argentino, que varía dependiendo de su peso en kg.
  const costoEnvio = () => {
    //actualizar esto
    if (totalPeso() < 1) {
      return 2340;
    } else if (totalPeso() >= 1 && totalPeso() < 5) {
      return 2850;
    } else if (totalPeso() >= 5 && totalPeso() < 10) {
      return 3730;
    } else if (totalPeso() >= 10 && totalPeso() < 15) {
      return 4600;
    } else if (totalPeso() >= 15 && totalPeso() < 20) {
      return 5400;
    } else {
      return 6600;
    }
  };

  const sumaPrecios = () => {
    let sumaPrecios = costoEnvio() + totalPrecio();
    return sumaPrecios;
  };

  //acá voy a poner todos los elementos que quiera usar en otro lado de la pagina
  let data = {
    cart,
    agregarProductos,
    limpiarCarrito,
    eliminarElemento,
    // cantidad,
    totalElementos,
    totalPrecio,
    precioConDescuento,
    totalPeso,
    costoEnvio,
    sumaPrecios,
  };

  return (
    //pongo a disposición el contexto con children
    <CartContext.Provider value={data}> {children}</CartContext.Provider>
  );
};
