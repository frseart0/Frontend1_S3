import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import BootstrapNavbar from "react-bootstrap/Navbar";

/**
 * Barra de navegación: categorías, búsqueda y acceso al carrito.
 */
export default function Navbar({
  categoria,
  textoBusqueda,
  totalUnidades,
  onCategoria,
  onTextoBusqueda,
  onBuscar,
  onAbrirCarrito,
  pagina,
  onIrTienda,
  onIrAgregar,
}) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  function elegirCategoria(nuevaCategoria) {
    onCategoria(nuevaCategoria);
    setMenuAbierto(false);
    onIrTienda("catalogo");
  }

  function irA(id) {
    setMenuAbierto(false);
    onIrTienda(id);
  }

  function manejarBusqueda(evento) {
    evento.preventDefault();
    onBuscar(textoBusqueda);
    setMenuAbierto(false);
    onIrTienda("catalogo");
  }

  return (
    <BootstrapNavbar
      expand="lg"
      variant="dark"
      sticky="top"
      className="site-navbar"
      aria-label="Navegación principal"
      expanded={menuAbierto}
      onToggle={setMenuAbierto}
    >
      <Container>
        <BootstrapNavbar.Brand
          href="#inicio"
          className="logo"
          onClick={(evento) => {
            evento.preventDefault();
            irA("inicio");
          }}
        >
          Game<span>Zone</span>
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="navbarPrincipal" aria-label="Abrir menú" />

        <BootstrapNavbar.Collapse id="navbarPrincipal">
          <Nav className="me-auto mb-2 mb-lg-0">
            <Nav.Link
              href="#inicio"
              onClick={(evento) => {
                evento.preventDefault();
                irA("inicio");
              }}
            >
              Inicio
            </Nav.Link>
            <Nav.Link
              href="#catalogo"
              className="filtro-categoria"
              active={pagina === "tienda" && categoria === "todos"}
              onClick={(evento) => {
                evento.preventDefault();
                elegirCategoria("todos");
              }}
            >
              Catálogo
            </Nav.Link>
            <Nav.Link
              href="#catalogo"
              className="filtro-categoria"
              active={pagina === "tienda" && categoria === "pc"}
              onClick={(evento) => {
                evento.preventDefault();
                elegirCategoria("pc");
              }}
            >
              PC
            </Nav.Link>
            <Nav.Link
              href="#catalogo"
              className="filtro-categoria"
              active={pagina === "tienda" && categoria === "consolas"}
              onClick={(evento) => {
                evento.preventDefault();
                elegirCategoria("consolas");
              }}
            >
              Consolas
            </Nav.Link>
            <Nav.Link
              href="#agregar"
              active={pagina === "agregar"}
              onClick={(evento) => {
                evento.preventDefault();
                setMenuAbierto(false);
                onIrAgregar();
              }}
            >
              Agregar juego
            </Nav.Link>
            <Nav.Link
              href="#ofertas"
              onClick={(evento) => {
                evento.preventDefault();
                irA("ofertas");
              }}
            >
              Ofertas
            </Nav.Link>
            <Nav.Link
              href="#contacto"
              onClick={(evento) => {
                evento.preventDefault();
                irA("contacto");
              }}
            >
              Contacto
            </Nav.Link>
          </Nav>

          <form className="d-flex mb-3 mb-lg-0 me-lg-3" role="search" onSubmit={manejarBusqueda}>
            <label className="visually-hidden" htmlFor="input-busqueda">
              Buscar productos
            </label>
            <input
              className="form-control me-2"
              type="search"
              id="input-busqueda"
              name="q"
              placeholder="Buscar juegos..."
              autoComplete="off"
              value={textoBusqueda}
              onChange={(evento) => onTextoBusqueda(evento.target.value)}
            />
            <button className="btn btn-outline-info" type="submit">
              Buscar
            </button>
          </form>

          <button
            className="btn btn-primary position-relative"
            type="button"
            onClick={onAbrirCarrito}
            aria-label="Abrir carrito de compras"
          >
            Carrito
            <span className="badge text-bg-light text-dark ms-1">{totalUnidades}</span>
          </button>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}
