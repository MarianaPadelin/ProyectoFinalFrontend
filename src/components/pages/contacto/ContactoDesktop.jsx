
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Divider from "@mui/material/Divider";


export const ContactoDesktop = ({ sendEmail, form, nombre, email, mensaje, setNombre, setEmail, setMensaje }) => {

  return (
    <div className="contacto">
      <div className="titulos">
        <h1 className="tituloParrafo">Contacto</h1>
        <p>
          Ante cualquier consulta o comentario no dudes en contactarte con
          nosotros
        </p>

        <span className="mediosContacto">
          <p>+54 9 11 1111 1111</p>
          <p>prueba@test.com</p>

          <Link
            style={{ color: "inherit", textDecoration: "none" }}
            to="https://wa.me/541111111?text=Buenos días. Estoy interesado en información sobre"
            target="_blank"
          >
            <p>
              <img src="https://res.cloudinary.com/dvxkjikvk/image/upload/v1698319402/uchi/iconos/ph_whatsapp-logo-thin_ahnkdg.png" />
              Whatsapp
            </p>
          </Link>
          <Link
            style={{ color: "inherit" }}
            to="https://www.instagram.com/marga.patagonia/"
            target="_blank"
          >
            <img src="https://res.cloudinary.com/dvxkjikvk/image/upload/v1698319462/uchi/iconos/instagram_dhprrb.png" />
          </Link>
        </span>
        <Divider textAlign="left">MGGM</Divider>
        <form
          action="mailto:marianapadelin@gmail.com"
          method="post"
          ref={form}
          onSubmit={sendEmail}
          className="form"
        >
          <p>
            También podés escribirnos y nos pondremos en contacto a la brevedad
          </p>
          <input
            label="Tu nombre"
            name="user_name"
            required
            className="input"
            placeholder="Tu nombre"
            onChange={(event) => setNombre(event.target.value)}
            value={nombre}
          />

          <input
            placeholder="Tu email"
            label="Tu email"
            name="user_email"
            required
            className="input"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
          <textarea
            rows={5}
            name="message"
            placeholder="Tu mensaje"
            className="input"
            id="textArea"
            onChange={(event) => setMensaje(event.target.value)}
            value={mensaje}
          />
          <div id="botonForm">
            <Button className="botonComprar" type="submit" value="Send">
              Enviar mensaje
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
