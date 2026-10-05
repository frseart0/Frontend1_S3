import ProductoCard from "./ProductoCard.jsx";

/**
 * Listado del catálogo, con estados de carga, error y búsqueda vacía.
 */
export default function Catalogo({ productos, cargando, error, idsEnCarrito, onAlternar }) {
  const mostrarResultado = !cargando && !error;

  return (
    <section id="catalogo" className="catalog py-5">
      <div className="container">
        <h2 className="section-title text-center">Catálogo de Juegos</h2>
        <p className="section-subtitle text-center mb-4">
          Descubre nuestra selección destacada para PC y consola
        </p>

        {mostrarResultado && (
          <p className="text-center text-muted mb-4" id="resultado-filtro" aria-live="polite">
            {"Mostrando " +
              productos.length +
              (productos.length === 1 ? " producto" : " productos")}
          </p>
        )}

        <div id="mensaje-catalogo" className="mb-3" aria-live="assertive">
          {error ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : null}
        </div>

        <div className="row g-4" id="productos-grid">
          {cargando ? (
            <div className="col-12 text-center py-5" id="estado-carga">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando productos...</span>
              </div>
              <p className="mt-3 mb-0">Cargando catálogo...</p>
            </div>
          ) : null}

          {!cargando && !error && productos.length === 0 ? (
            <div className="col-12">
              <p className="alert alert-warning mb-0">
                No hay productos que coincidan con tu búsqueda.
              </p>
            </div>
          ) : null}

          {!cargando && !error
            ? productos.map((producto) => (
                <ProductoCard
                  key={producto.id}
                  producto={producto}
                  enCarrito={idsEnCarrito.includes(producto.id)}
                  onAlternar={onAlternar}
                />
              ))
            : null}
        </div>
      </div>
    </section>
  );
}
