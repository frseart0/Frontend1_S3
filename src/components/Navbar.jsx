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
}) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  function elegirCategoria(nuevaCategoria) {
    onCategoria(nuevaCategoria);
    setMenuAbierto(false);
  }

  function manejarBusqueda(evento) {
    evento.preventDefault();
    onBuscar(textoBusqueda);
    setMenuAbierto(false);
    document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
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
        <BootstrapNavbar.Brand href="#inicio" className="logo">
          Game<span>Zone</span>
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="navbarPrincipal" aria-label="Abrir menú" />

        <BootstrapNavbar.Collapse id="navbarPrincipal">
          <Nav className="me-auto mb-2 mb-lg-0">
            <Nav.Link href="#inicio" onClick={() => setMenuAbierto(false)}>
              Inicio
            </Nav.Link>
            <Nav.Link
              href="#catalogo"
              className="filtro-categoria"
              active={categoria === "todos"}
              onClick={() => elegirCategoria("todos")}
            >
              Catálogo
            </Nav.Link>
            <Nav.Link
              href="#catalogo"
              className="filtro-categoria"
              active={categoria === "pc"}
              onClick={() => elegirCategoria("pc")}
            >
              PC
            </Nav.Link>
            <Nav.Link
              href="#catalogo"
              className="filtro-categoria"
              active={categoria === "consolas"}
              onClick={() => elegirCategoria("consolas")}
            >
              Consolas
            </Nav.Link>
            <Nav.Link href="#ofertas" onClick={() => setMenuAbierto(false)}>
              Ofertas
            </Nav.Link>
            <Nav.Link href="#contacto" onClick={() => setMenuAbierto(false)}>
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
