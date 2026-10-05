import Offcanvas from "react-bootstrap/Offcanvas";
import { formatearPrecio } from "../utils/precio";

/**
 * Panel del carrito: vacío, listado, contador y total a precio de oferta.
 */
export default function Carrito({
  abierto,
  totalUnidades,
  items,
  total,
  onCerrar,
  onQuitar,
  onSumar,
  onVaciar,
}) {
  return (
    <Offcanvas
      show={abierto}
      onHide={onCerrar}
      placement="end"
      id="carrito"
      aria-labelledby="carritoLabel"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title as="h2" className="h5" id="carritoLabel">
          Tu carrito
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="d-flex flex-column">
        <p className="mb-3">
          Productos en el carrito: <strong>{totalUnidades}</strong>
        </p>
        <div aria-live="polite">
          {items.length === 0 ? (
            <p className="cart-empty">Tu carrito está vacío. Agrega un juego del catálogo.</p>
          ) : (
            items.map((item) => (
              <div className="cart-item" key={item.id}>
                <p className="mb-1 fw-semibold">{item.nombre}</p>
                <p className="mb-2 small">
                  {item.cantidad} × {formatearPrecio(item.precioOferta)} ={" "}
                  {formatearPrecio(item.precioOferta * item.cantidad)}
                </p>
                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-info"
                    onClick={() => onSumar(item)}
                  >
                    Sumar
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onQuitar(item.id)}
                  >
                    Quitar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="mt-auto pt-3 border-top">
          <p className="fs-5 mb-3">
            Total: <strong>{formatearPrecio(total)}</strong>
          </p>
          <button type="button" className="btn btn-outline-light w-100" onClick={onVaciar}>
            Vaciar carrito
          </button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
