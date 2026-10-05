import { formatearPrecio } from "../utils/precio";

const IMAGEN_RESPALDO =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="460" height="215"><rect fill="#171b30" width="100%" height="100%"/><text x="50%" y="50%" fill="#a0a4c1" font-size="18" text-anchor="middle" dy=".3em">Sin imagen</text></svg>'
  );

function alFallarImagen(evento) {
  evento.currentTarget.onerror = null;
  evento.currentTarget.src = IMAGEN_RESPALDO;
  evento.currentTarget.alt = evento.currentTarget.alt + " (imagen no disponible)";
}

/**
 * Tarjeta de producto. El texto del botón depende de si ya está en el carrito.
 */
export default function ProductoCard({ producto, enCarrito, onAlternar }) {
  const textoBoton = enCarrito ? "En el carrito" : "Agregar al carrito";

  return (
    <div className="col-12 col-md-6 col-lg-3">
      <article className="card product-card h-100">
        <img
          className="card-img-top"
          src={producto.imagen}
          alt={producto.nombre}
          onError={alFallarImagen}
        />
        <div className="card-body d-flex flex-column">
          <span className="badge mb-2">{producto.plataforma}</span>
          <h3 className="card-title">{producto.nombre}</h3>
          <p className="card-text">{producto.genero}</p>
          <p className="product-extra small mb-3">{producto.descripcion}</p>
          <div className="mt-auto">
            <span className="price-label">Precio normal</span>
            <span className="price-normal">{formatearPrecio(producto.precio)}</span>
            <span className="price-label mt-1">Precio oferta</span>
            <span className="price d-block mb-3">{formatearPrecio(producto.precioOferta)}</span>
            <button
              type="button"
              className={enCarrito ? "btn btn-add en-carrito w-100" : "btn btn-add w-100"}
              onClick={() => onAlternar(producto)}
            >
              {textoBoton}
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
