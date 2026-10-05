const OFERTAS = [
  {
    titulo: "Combo Gamer",
    texto: "Consola + 2 juegos + control extra",
    descuento: "-25% OFF",
  },
  {
    titulo: "Semana RPG",
    texto: "Los mejores RPG con descuentos exclusivos",
    descuento: "-15% OFF",
  },
  {
    titulo: "Accesorios Pro",
    texto: "Audífonos, controles y sillas gamer",
    descuento: "-30% OFF",
  },
];

export default function Ofertas() {
  return (
    <section id="ofertas" className="offers py-5">
      <div className="container">
        <h2 className="section-title text-center mb-4">Ofertas Destacadas</h2>
        <div className="row g-4">
          {OFERTAS.map((oferta) => (
            <div className="col-12 col-md-6 col-lg-4" key={oferta.titulo}>
              <article className="offer-card h-100 p-4 text-center">
                <h3>{oferta.titulo}</h3>
                <p>{oferta.texto}</p>
                <span className="offer-price">{oferta.descuento}</span>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
