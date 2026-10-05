import Carousel from "react-bootstrap/Carousel";

const DESTACADOS = [
  {
    imagen:
      "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/3280350/6270c77b0729e2df0a17d660286eeddfd9169386/header.jpg?t=1774022345",
    alt: "Death Stranding 2, juego destacado de acción y aventura",
    titulo: (
      <>
        Vive la nueva generación de <span>videojuegos</span>
      </>
    ),
    texto: "Death Stranding 2 ya está en GameZone. Envío a todo el país.",
    enlace: "Ver catálogo",
    esPrincipal: true,
  },
  {
    imagen: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1174180/header.jpg",
    alt: "Red Dead Redemption 2 para PC",
    titulo: "El oeste en tu PC",
    texto: "Red Dead Redemption 2 con descuento de catálogo.",
    enlace: "Comprar ahora",
    esPrincipal: false,
  },
  {
    imagen: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/header.jpg",
    alt: "Elden Ring, RPG de acción",
    titulo: "Las Tierras Intermedias te esperan",
    texto: "Elden Ring para PS5, disponible en consolas.",
    enlace: "Ver en catálogo",
    esPrincipal: false,
  },
];

/**
 * Carrusel de destacados. Cambia de imagen cada 3 segundos.
 */
export default function Carrusel() {
  return (
    <section id="inicio" className="hero" aria-label="Juegos destacados">
      <Carousel interval={3000} pause="hover">
        {DESTACADOS.map((slide) => (
          <Carousel.Item key={slide.alt} interval={3000}>
            <img src={slide.imagen} className="d-block w-100 carousel-img" alt={slide.alt} />
            <Carousel.Caption>
              {slide.esPrincipal ? (
                <h1 className="h2">{slide.titulo}</h1>
              ) : (
                <h2 className="h2">{slide.titulo}</h2>
              )}
              <p className="d-none d-md-block">{slide.texto}</p>
              <a href="#catalogo" className="btn btn-primary">
                {slide.enlace}
              </a>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
}
