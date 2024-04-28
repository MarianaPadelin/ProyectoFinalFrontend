import { ItemList } from "./ItemList";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../common/Loader";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

export const ItemListContainer = () => {
  const [items, setItems] = useState([]);
  const { nombreCategoria } = useParams();
  const { page } = useParams();
  let querys = "";
  let navigate = useNavigate()

  if (nombreCategoria) {
    querys = nombreCategoria;
  }


  async function getCollection() {
    let backendcolection = await axios.get(
      `/api/products?category=${querys}&&page=${page}`
    );

    if (backendcolection.data.docs.length !== 0) {
      return backendcolection.data.docs;
    } else 
     Swal.fire({
       title: "La página no existe",
       text: "Será redirigido a la página principal",
       icon: "warning",
       background: "lightGrey",
       confirmButtonColor: "cadetBlue",
       timer: 5000,
     });
    navigate("/")
  }

  useEffect(() => {
    getCollection()
      .then((res) => {
        let result = res.map((elemento) => {
          return {
            id: elemento._id,
            title: elemento.title,
            stock: elemento.stock,
            description: elemento.description,
            price: elemento.price,
            img: elemento.thumbnails,
            category: elemento.category,
          };
        });
        setItems(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [nombreCategoria, page]);

  const imagenes = [
    {
      id: "img1",
      url: "https://res.cloudinary.com/dvxkjikvk/image/upload/v1705414748/productos/c58a9ac4-01a3-4387-88ca-9f9ae6962acd_flpcon.jpg",
    },
    {
      id: "img2",
      url: "https://res.cloudinary.com/dvxkjikvk/image/upload/v1705415691/productos/WhatsApp_Image_2024-01-16_at_11.33.18_yng8kn.jpg",
    },
    {
      id: "img3",
      url: "https://res.cloudinary.com/dvxkjikvk/image/upload/v1705415888/productos/WhatsApp_Image_2024-01-16_at_11.33.14_l9b431.jpg",
    },
  ];

  return (
    <div>
      {items.length > 0 ? (
        <div>
          <ItemList
            imagenes={imagenes}
            items={items}
          />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};
