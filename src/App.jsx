import { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Carrusel from "./components/Carrusel.jsx";
import Catalogo from "./components/Catalogo.jsx";
import Ofertas from "./components/Ofertas.jsx";
import Footer from "./components/Footer.jsx";
import Carrito from "./components/Carrito.jsx";

const RUTA_PRODUCTOS = `${import.meta.env.BASE_URL}data/productos.json`;

/**
 * Filtra el catálogo por categoría del navbar y por el texto del buscador.
 */
function filtrarProductos(productos, categoria, termino) {
  const texto = termino.trim().toLowerCase();

  return productos.filter((producto) => {
    const coincideCategoria = categoria === "todos" || producto.categoria === categoria;
    const coincideTexto =
      texto === "" ||
      producto.nombre.toLowerCase().includes(texto) ||
      producto.genero.toLowerCase().includes(texto) ||
      producto.plataforma.toLowerCase().includes(texto);

    return coincideCategoria && coincideTexto;
  });
}

export default function App() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [carrito, setCarrito] = useState([]);
  const [categoria, setCategoria] = useState("todos");
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  useEffect(() => {
    let activo = true;

    async function cargarProductos() {
      try {
        const respuesta = await fetch(RUTA_PRODUCTOS);

        if (!respuesta.ok) {
          throw new Error("No se pudo obtener el catálogo (código " + respuesta.status + ").");
        }

        const datos = await respuesta.json();

        if (!Array.isArray(datos) || datos.length === 0) {
          throw new Error("El catálogo está vacío o tiene un formato inválido.");
        }

        if (activo) {
          setProductos(datos);
          setError("");
        }
      } catch (err) {
        console.error("Error al cargar productos:", err);
        if (activo) {
          setProductos([]);
          setError(
            "No pudimos cargar el catálogo en este momento. Revisa tu conexión o intenta más tarde."
          );
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    }

    cargarProductos();

    return () => {
      activo = false;
    };
  }, []);

  /**
   * Agrega el producto o suma una unidad si ya está en el carrito.
   */
  function agregarAlCarrito(producto) {
    setCarrito((actual) => {
      const existente = actual.find((item) => item.id === producto.id);

      if (existente) {
        return actual.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }

      return [
        ...actual,
        {
          id: producto.id,
          nombre: producto.nombre,
          precioOferta: producto.precioOferta,
          cantidad: 1,
        },
      ];
    });
  }

  function quitarDelCarrito(id) {
    setCarrito((actual) => actual.filter((item) => item.id !== id));
  }

  function vaciarCarrito() {
    setCarrito([]);
  }

  /**
   * El mismo botón agrega el juego o lo quita si ya figura como "En el carrito".
   */
  function alternarProducto(producto) {
    const yaEsta = carrito.some((item) => item.id === producto.id);

    if (yaEsta) {
      quitarDelCarrito(producto.id);
      return;
    }

    agregarAlCarrito(producto);
  }

  function cambiarCategoria(nuevaCategoria) {
    setCategoria(nuevaCategoria);
    setTerminoBusqueda("");
    setTextoBusqueda("");
  }

  const productosFiltrados = filtrarProductos(productos, categoria, terminoBusqueda);
  const idsEnCarrito = carrito.map((item) => item.id);
  const totalUnidades = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const totalPrecio = carrito.reduce((acc, item) => acc + item.precioOferta * item.cantidad, 0);

  return (
    <>
      <a className="visually-hidden-focusable skip-link" href="#catalogo">
        Saltar al catálogo
      </a>

      <Navbar
        categoria={categoria}
        textoBusqueda={textoBusqueda}
        totalUnidades={totalUnidades}
        onCategoria={cambiarCategoria}
        onTextoBusqueda={setTextoBusqueda}
        onBuscar={setTerminoBusqueda}
        onAbrirCarrito={() => setMostrarCarrito(true)}
      />

      <main>
        <Carrusel />
        <Catalogo
          productos={productosFiltrados}
          cargando={cargando}
          error={error}
          idsEnCarrito={idsEnCarrito}
          onAlternar={alternarProducto}
        />
        <Ofertas />
      </main>

      <Footer />

      <Carrito
        abierto={mostrarCarrito}
        totalUnidades={totalUnidades}
        items={carrito}
        total={totalPrecio}
        onCerrar={() => setMostrarCarrito(false)}
        onQuitar={quitarDelCarrito}
        onSumar={agregarAlCarrito}
        onVaciar={vaciarCarrito}
      />
    </>
  );
}
