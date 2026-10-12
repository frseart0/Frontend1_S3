import { useState } from "react";

const EMAIL_VALIDO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Formulario de contacto. Valida nombre, email y mensaje antes de aceptar el envío.
 */
export default function Contacto() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  function enviar(evento) {
    evento.preventDefault();

    const nuevos = {};

    if (nombre.trim() === "") {
      nuevos.nombre = "El nombre es obligatorio.";
    }

    if (email.trim() === "") {
      nuevos.email = "El email es obligatorio.";
    } else if (!EMAIL_VALIDO.test(email.trim())) {
      nuevos.email = "Ingresa un email válido, por ejemplo nombre@correo.com.";
    }

    if (mensaje.trim() === "") {
      nuevos.mensaje = "El mensaje es obligatorio.";
    }

    setErrores(nuevos);

    if (Object.keys(nuevos).length > 0) {
      setEnviado(false);
      return;
    }

    setNombre("");
    setEmail("");
    setMensaje("");
    setErrores({});
    setEnviado(true);
  }

  return (
    <section id="contacto" className="contact py-5">
      <div className="container">
        <h2 className="section-title text-center">Contacto</h2>
        <p className="section-subtitle text-center mb-4">
          Escríbele al administrador de GameZone
        </p>

        <form className="site-form col-12 col-lg-8 mx-auto" onSubmit={enviar} noValidate>
          {enviado ? (
            <div className="alert alert-success" role="status">
              Mensaje enviado. Te responderemos a la brevedad.
            </div>
          ) : null}

          <div className="mb-3">
            <label className="form-label" htmlFor="contacto-nombre">
              Nombre
            </label>
            <input
              className="form-control"
              type="text"
              id="contacto-nombre"
              name="nombre"
              autoComplete="name"
              value={nombre}
              aria-invalid={Boolean(errores.nombre)}
              aria-describedby={errores.nombre ? "error-contacto-nombre" : undefined}
              onChange={(evento) => {
                setNombre(evento.target.value);
                setEnviado(false);
              }}
            />
            {errores.nombre ? (
              <div id="error-contacto-nombre" className="alert alert-danger mt-2 mb-0 py-2" role="alert">
                {errores.nombre}
              </div>
            ) : null}
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="contacto-email">
              Email
            </label>
            <input
              className="form-control"
              type="email"
              id="contacto-email"
              name="email"
              autoComplete="email"
              value={email}
              aria-invalid={Boolean(errores.email)}
              aria-describedby={errores.email ? "error-contacto-email" : undefined}
              onChange={(evento) => {
                setEmail(evento.target.value);
                setEnviado(false);
              }}
            />
            {errores.email ? (
              <div id="error-contacto-email" className="alert alert-danger mt-2 mb-0 py-2" role="alert">
                {errores.email}
              </div>
            ) : null}
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="contacto-mensaje">
              Mensaje
            </label>
            <textarea
              className="form-control"
              id="contacto-mensaje"
              name="mensaje"
              rows="4"
              value={mensaje}
              aria-invalid={Boolean(errores.mensaje)}
              aria-describedby={errores.mensaje ? "error-contacto-mensaje" : undefined}
              onChange={(evento) => {
                setMensaje(evento.target.value);
                setEnviado(false);
              }}
            />
            {errores.mensaje ? (
              <div id="error-contacto-mensaje" className="alert alert-danger mt-2 mb-0 py-2" role="alert">
                {errores.mensaje}
              </div>
            ) : null}
          </div>

          <button className="btn btn-primary" type="submit">
            Enviar mensaje
          </button>
        </form>
      </div>
    </section>
  );
}
