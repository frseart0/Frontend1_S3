# GameZone

Tienda web de videojuegos. Muestra un catálogo en tarjetas, permite filtrar por categoría, agregar o quitar juegos de la lista, armar un carrito y enviar un mensaje de contacto.

## Instalación

Requiere Node.js 20 o superior.

```bash
npm install
npm run dev
```

Vite muestra la URL local (por defecto `http://localhost:5173`).

Para generar la versión de producción:

```bash
npm run build
npm run preview
```

## Uso

- **Inicio.** El carrusel presenta juegos destacados.
- **Catálogo.** Lista los juegos cargados desde `public/data/productos.json`. Cada tarjeta muestra imagen, nombre, precio y descripción.
- **Filtro por categoría.** En la barra de navegación, Catálogo muestra todos los juegos, PC solo la categoría PC y Consolas solo consolas.
- **Búsqueda.** Escribe en el buscador y pulsa Buscar. El texto se compara con el nombre, el género y la plataforma.
- **Agregar un juego.** El enlace Agregar juego abre una página aparte. Completa nombre, categoría, precio y descripción. La URL de la imagen es opcional. Al enviar, el juego queda en el catálogo. Ver en el catálogo vuelve al listado.
- **Quitar un juego.** En la tarjeta, Quitar del catálogo lo saca de la lista y también del carrito si estaba ahí.
- **Carrito.** Agregar al carrito suma el juego. Si ya está, el botón pasa a En el carrito y al pulsarlo lo quita. El contador de la barra muestra las unidades. Dentro del carrito se puede sumar, quitar un ítem o vaciarlo. El total usa el precio de oferta.
- **Contacto.** La sección Contacto pide nombre, email y mensaje. Si falta un dato o el email no tiene formato válido, el envío se detiene y se muestra el error junto al campo. Con datos válidos, el formulario se limpia y aparece un mensaje de confirmación.
