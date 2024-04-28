// import { Pagination } from "@mui/material";
import { Button } from "react-bootstrap"
import { ProductCard } from "../../common/ProductCard/ProductCard";
import "./ItemList.css";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom"

export const ItemList = ({ imagenes, items }) => {
  return (
    <div>
      <Carousel indicators={false}>
        {imagenes.map(({ id, url }) => (
          <Carousel.Item key={id}>
            <img style={{ opacity: "70%", width: "100%" }} src={url}></img>

            <Carousel.Caption className="textoCarrusel">
              <div className="texto1">
                <h3 className="titulo3">
                  <i>Cerámica artesanal</i>
                </h3>
              </div>
              <div>
                <a className="texto2" href="#products">
                  <h3 id="autoscroll">
                    <b>Descubre nuestros productos</b>
                  </h3>

                  <img
                    src="https://res.cloudinary.com/dvxkjikvk/image/upload/v1698414308/uchi/iconos/arrow-down-circle_cqkmai.png"
                    width={35}
                  />
                </a>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      <br></br>
      <div className="cards-container" id="products">
        {items.map((elemento) => {
          return <ProductCard key={elemento.id} elemento={elemento} />;
        })}
      </div>
      <div className="pagination">
        <Link to="/1">
          <Button variant="outline-secondary"> Pagina 1</Button>
        </Link>
        {/* {items.length > 6 && ( */}
          <Link to="/2">
            <Button variant="outline-secondary">Pagina 2</Button>
          </Link>
        {/* )} */}

        {items.length > 12 && (
          <Link to="/3">
            <Button variant="outline-secondary">Pagina 3</Button>
          </Link>
        )}

      </div>
    </div>
  );
};
