import { useState } from "react";

/**
 * Página para sumar un juego al catálogo. App asigna el id.
 */
export default function AgregarJuego({ cargando, error, onAgregar, onVolver }) {
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("pc");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");
  const [errores, setErrores] = useState({});
  const [agregado, setAgregado] = useState(false);

  function enviar(evento) {
    evento.preventDefault();

    const valor = Number(precio);
    const nuevos = {};

    if (nombre.trim() === "") {
      nuevos.nombre = "El nombre es obligatorio.";
    }

    if (precio.trim() === "" || Number.isNaN(valor) || valor <= 0) {
      nuevos.precio = "Ingresa un precio numérico mayor que 0.";
    }

    if (descripcion.trim() === "") {
      nuevos.descripcion = "La descripción es obligatoria.";
    }

    setErrores(nuevos);

    if (Object.keys(nuevos).length > 0) {
      setAgregado(false);
      return;
    }

    onAgregar({
      nombre: nombre.trim(),
      categoria,
      plataforma: categoria === "pc" ? "PC" : "Consola",
      genero: "Videojuego",
      precio: valor,
      precioOferta: valor,
      imagen: imagen.trim(),
      descripcion: descripcion.trim(),
    });

    setNombre("");
    setCategoria("pc");
    setPrecio("");
    setDescripcion("");
    setImagen("");
    setErrores({});
    setAgregado(true);
  }

  return (
    <section id="agregar" className="agregar-juego py-5">
      <div className="container">
        <h2 className="section-title text-center">Agregar juego</h2>
        <p className="section-subtitle text-center mb-4">
          El juego se suma al catálogo y queda disponible para filtrar y comprar
        </p>

        {cargando ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando catálogo...</span>
            </div>
            <p className="mt-3 mb-0">Cargando catálogo...</p>
          </div>
        ) : null}

        {!cargando && error ? (
          <div className="alert alert-danger col-12 col-lg-8 mx-auto" role="alert">
            {error}
          </div>
        ) : null}

        {!cargando && !error ? (
          <form className="site-form alta-juego card col-12 col-lg-8 mx-auto" onSubmit={enviar} noValidate>
            <div className="card-body">
              {agregado ? (
                <div className="alert alert-success" role="status">
                  Juego agregado al catálogo.
                  <button type="button" className="btn btn-link p-0 ms-2 align-baseline" onClick={onVolver}>
                    Ver en el catálogo
                  </button>
                </div>
              ) : null}

              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label className="form-label" htmlFor="alta-nombre">
                    Nombre
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="alta-nombre"
                    name="nombre"
                    value={nombre}
                    aria-invalid={Boolean(errores.nombre)}
                    aria-describedby={errores.nombre ? "error-alta-nombre" : undefined}
                    onChange={(evento) => {
                      setNombre(evento.target.value);
                      setAgregado(false);
                    }}
                  />
                  {errores.nombre ? (
                    <div id="error-alta-nombre" className="alert alert-danger mt-2 mb-0 py-2" role="alert">
                      {errores.nombre}
                    </div>
                  ) : null}
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label" htmlFor="alta-categoria">
                    Categoría
                  </label>
                  <select
                    className="form-select"
                    id="alta-categoria"
                    name="categoria"
                    value={categoria}
                    onChange={(evento) => setCategoria(evento.target.value)}
                  >
                    <option value="pc">PC</option>
                    <option value="consolas">Consolas</option>
                  </select>
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label" htmlFor="alta-precio">
                    Precio
                  </label>
                  <input
                    className="form-control"
                    type="number"
                    id="alta-precio"
                    name="precio"
                    min="1"
                    step="1"
                    value={precio}
                    aria-invalid={Boolean(errores.precio)}
                    aria-describedby={errores.precio ? "error-alta-precio" : undefined}
                    onChange={(evento) => {
                      setPrecio(evento.target.value);
                      setAgregado(false);
                    }}
                  />
                  {errores.precio ? (
                    <div id="error-alta-precio" className="alert alert-danger mt-2 mb-0 py-2" role="alert">
                      {errores.precio}
                    </div>
                  ) : null}
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label" htmlFor="alta-imagen">
                    Imagen (URL, opcional)
                  </label>
                  <input
                    className="form-control"
                    type="url"
                    id="alta-imagen"
                    name="imagen"
                    placeholder="https://"
                    value={imagen}
                    onChange={(evento) => setImagen(evento.target.value)}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label" htmlFor="alta-descripcion">
                    Descripción
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="alta-descripcion"
                    name="descripcion"
                    value={descripcion}
                    aria-invalid={Boolean(errores.descripcion)}
                    aria-describedby={errores.descripcion ? "error-alta-descripcion" : undefined}
                    onChange={(evento) => {
                      setDescripcion(evento.target.value);
                      setAgregado(false);
                    }}
                  />
                  {errores.descripcion ? (
                    <div
                      id="error-alta-descripcion"
                      className="alert alert-danger mt-2 mb-0 py-2"
                      role="alert"
                    >
                      {errores.descripcion}
                    </div>
                  ) : null}
                </div>

                <div className="col-12">
                  <button className="btn btn-primary" type="submit">
                    Agregar al catálogo
                  </button>
                </div>
              </div>
            </div>
          </form>
        ) : null}
      </div>
    </section>
  );
}
