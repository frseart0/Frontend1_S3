const RUTA_PRODUCTOS = "data/productos.json";

/** Catálogo completo traído por Fetch */
let productos = [];
/** Ítems del carrito: { id, nombre, precio, cantidad } */
let carrito = [];
let categoriaActual = "todos";
let terminoBusqueda = "";

const grid = document.getElementById("productos-grid");
const mensajeCatalogo = document.getElementById("mensaje-catalogo");
const resultadoFiltro = document.getElementById("resultado-filtro");
const formBusqueda = document.getElementById("form-busqueda");
const inputBusqueda = document.getElementById("input-busqueda");
const carritoLista = document.getElementById("carrito-lista");
const carritoTotal = document.getElementById("carrito-total");
const badgeCarrito = document.getElementById("badge-carrito");
const btnVaciar = document.getElementById("btn-vaciar-carrito");

/**
 * Formatea un número como pesos chilenos.
 */
function formatearPrecio(valor) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0
  }).format(valor);
}

/**
 * Carga el catálogo desde el JSON local con Fetch y manejo de errores.
 */
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

    productos = datos;
    mensajeCatalogo.replaceChildren();
    aplicarFiltros();
  } catch (error) {
    console.error("Error al cargar productos:", error);
    mostrarErrorCarga();
  }
}

/**
 * Muestra un aviso amigable si falla la carga del JSON.
 */
function mostrarErrorCarga() {
  grid.replaceChildren();

  const alerta = document.createElement("div");
  alerta.className = "alert alert-danger";
  alerta.setAttribute("role", "alert");
  alerta.textContent =
    "No pudimos cargar el catálogo en este momento. Revisa tu conexión o intenta más tarde.";
  mensajeCatalogo.replaceChildren(alerta);
  resultadoFiltro.textContent = "";
}

/**
 * Filtra por categoría del navbar y por el texto del buscador.
 */
function obtenerProductosFiltrados() {
  const texto = terminoBusqueda.trim().toLowerCase();

  return productos.filter((producto) => {
    const coincideCategoria =
      categoriaActual === "todos" || producto.categoria === categoriaActual;

    const coincideTexto =
      texto === "" ||
      producto.nombre.toLowerCase().includes(texto) ||
      producto.genero.toLowerCase().includes(texto) ||
      producto.plataforma.toLowerCase().includes(texto);

    return coincideCategoria && coincideTexto;
  });
}

/**
 * Aplica filtros actuales y vuelve a pintar el grid.
 */
function aplicarFiltros() {
  const filtrados = obtenerProductosFiltrados();
  renderProductos(filtrados);
}

/**
 * Construye las tarjetas del catálogo con createElement / appendChild.
 */
function renderProductos(lista) {
  grid.replaceChildren();

  if (lista.length === 0) {
    const vacio = document.createElement("div");
    vacio.className = "col-12";
    const aviso = document.createElement("p");
    aviso.className = "alert alert-warning mb-0";
    aviso.textContent = "No hay productos que coincidan con tu búsqueda.";
    vacio.appendChild(aviso);
    grid.appendChild(vacio);
    resultadoFiltro.textContent = "Mostrando 0 productos";
    return;
  }

  lista.forEach((producto) => {
    grid.appendChild(crearCardProducto(producto));
  });

  resultadoFiltro.textContent =
    "Mostrando " + lista.length + (lista.length === 1 ? " producto" : " productos");
}

/**
 * Crea una columna + card de Bootstrap para un producto.
 */
function crearCardProducto(producto) {
  const col = document.createElement("div");
  col.className = "col-12 col-md-6 col-lg-3";

  const card = document.createElement("article");
  card.className = "card product-card h-100";
  card.dataset.id = String(producto.id);

  const img = document.createElement("img");
  img.className = "card-img-top";
  img.src = producto.imagen;
  img.alt = producto.nombre;
  img.addEventListener("error", () => {
    img.alt = producto.nombre + " (imagen no disponible)";
    img.src =
      "data:image/svg+xml," +
      encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="460" height="215"><rect fill="#171b30" width="100%" height="100%"/><text x="50%" y="50%" fill="#a0a4c1" font-size="18" text-anchor="middle">Sin imagen</text></svg>'
      );
  });

  const body = document.createElement("div");
  body.className = "card-body d-flex flex-column";

  const badge = document.createElement("span");
  badge.className = "badge mb-2";
  badge.textContent = producto.plataforma;

  const titulo = document.createElement("h3");
  titulo.className = "card-title";
  titulo.textContent = producto.nombre;

  const genero = document.createElement("p");
  genero.className = "card-text";
  genero.textContent = producto.genero;

  const extra = document.createElement("p");
  extra.className = "product-extra small mb-3";
  extra.textContent = "Pasa el mouse para ver más";
  extra.dataset.placeholder = "Pasa el mouse para ver más";
  extra.dataset.descripcion = producto.descripcion;

  const footer = document.createElement("div");
  footer.className = "mt-auto d-flex align-items-center justify-content-between gap-2";

  const precio = document.createElement("span");
  precio.className = "price";
  precio.textContent = formatearPrecio(producto.precio);

  const boton = document.createElement("button");
  boton.type = "button";
  boton.className = "btn btn-add";
  boton.dataset.accion = "agregar";
  boton.dataset.id = String(producto.id);
  boton.textContent = "Agregar";

  footer.appendChild(precio);
  footer.appendChild(boton);

  body.appendChild(badge);
  body.appendChild(titulo);
  body.appendChild(genero);
  body.appendChild(extra);
  body.appendChild(footer);

  card.appendChild(img);
  card.appendChild(body);
  col.appendChild(card);
  return col;
}

/**
 * Agrega un producto al carrito o suma cantidad si ya existe.
 */
function agregarAlCarrito(id) {
  const producto = productos.find((item) => item.id === id);
  if (!producto) {
    return;
  }

  const existente = carrito.find((item) => item.id === id);
  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1
    });
  }

  renderCarrito();
}

/**
 * Quita un producto del carrito por id.
 */
function eliminarDelCarrito(id) {
  carrito = carrito.filter((item) => item.id !== id);
  renderCarrito();
}

/**
 * Deja el carrito vacío.
 */
function vaciarCarrito() {
  carrito = [];
  renderCarrito();
}

/**
 * Pinta el resumen del carrito, el total y el badge del navbar.
 */
function renderCarrito() {
  carritoLista.replaceChildren();

  const totalUnidades = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  badgeCarrito.textContent = String(totalUnidades);

  if (carrito.length === 0) {
    const vacio = document.createElement("p");
    vacio.className = "cart-empty";
    vacio.textContent = "Tu carrito está vacío. Agrega un juego del catálogo.";
    carritoLista.appendChild(vacio);
    carritoTotal.textContent = formatearPrecio(0);
    return;
  }

  carrito.forEach((item) => {
    const fila = document.createElement("div");
    fila.className = "cart-item";

    const nombre = document.createElement("p");
    nombre.className = "mb-1 fw-semibold";
    nombre.textContent = item.nombre;

    const detalle = document.createElement("p");
    detalle.className = "mb-2 small";
    detalle.textContent =
      item.cantidad + " × " + formatearPrecio(item.precio) + " = " + formatearPrecio(item.precio * item.cantidad);

    const quitar = document.createElement("button");
    quitar.type = "button";
    quitar.className = "btn btn-sm btn-outline-danger";
    quitar.dataset.accion = "eliminar";
    quitar.dataset.id = String(item.id);
    quitar.textContent = "Quitar";

    fila.appendChild(nombre);
    fila.appendChild(detalle);
    fila.appendChild(quitar);
    carritoLista.appendChild(fila);
  });

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  carritoTotal.textContent = formatearPrecio(total);
}

/**
 * Resalta la categoría activa en el navbar.
 */
function marcarCategoriaActiva(categoria) {
  document.querySelectorAll(".filtro-categoria").forEach((enlace) => {
    enlace.classList.toggle("active", enlace.dataset.categoria === categoria);
  });
}

/**
 * Conecta click, submit y mouseover a los elementos de la página.
 */
function inicializarEventos() {
  // Click: agregar al carrito (delegado en el grid)
  grid.addEventListener("click", (evento) => {
    const boton = evento.target.closest("[data-accion='agregar']");
    if (!boton) {
      return;
    }
    agregarAlCarrito(Number(boton.dataset.id));
  });

  // Mouseover / mouseout: resalta la card y muestra la descripción
  grid.addEventListener("mouseover", (evento) => {
    const card = evento.target.closest(".product-card");
    if (!card || !grid.contains(card)) {
      return;
    }
    card.classList.add("card-hover");
    const extra = card.querySelector(".product-extra");
    if (extra && extra.dataset.descripcion) {
      extra.textContent = extra.dataset.descripcion;
    }
  });

  grid.addEventListener("mouseout", (evento) => {
    const card = evento.target.closest(".product-card");
    if (!card) {
      return;
    }
    const destino = evento.relatedTarget;
    if (destino && card.contains(destino)) {
      return;
    }
    card.classList.remove("card-hover");
    const extra = card.querySelector(".product-extra");
    if (extra && extra.dataset.placeholder) {
      extra.textContent = extra.dataset.placeholder;
    }
  });

  // Submit: buscar productos por nombre, género o plataforma
  formBusqueda.addEventListener("submit", (evento) => {
    evento.preventDefault();
    terminoBusqueda = inputBusqueda.value;
    aplicarFiltros();
    document.getElementById("catalogo").scrollIntoView({ behavior: "smooth" });
  });

  // Click extra: filtrar por categoría simulada del navbar
  document.querySelectorAll(".filtro-categoria").forEach((enlace) => {
    enlace.addEventListener("click", () => {
      categoriaActual = enlace.dataset.categoria || "todos";
      terminoBusqueda = "";
      inputBusqueda.value = "";
      marcarCategoriaActiva(categoriaActual);
      aplicarFiltros();
    });
  });

  // Click extra: quitar un ítem o vaciar el carrito
  carritoLista.addEventListener("click", (evento) => {
    const boton = evento.target.closest("[data-accion='eliminar']");
    if (!boton) {
      return;
    }
    eliminarDelCarrito(Number(boton.dataset.id));
  });

  btnVaciar.addEventListener("click", vaciarCarrito);
}

document.addEventListener("DOMContentLoaded", () => {
  inicializarEventos();
  renderCarrito();
  cargarProductos();
});
