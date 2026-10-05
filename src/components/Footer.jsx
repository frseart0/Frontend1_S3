export default function Footer() {
  return (
    <footer id="contacto" className="site-footer pt-5">
      <div className="container">
        <div className="row g-4 pb-4">
          <div className="col-12 col-md-6 col-lg-3">
            <h2 className="h5">
              Game<span>Zone</span>
            </h2>
            <p className="footer-text">
              Tu tienda de confianza en videojuegos, consolas y accesorios desde 2024.
            </p>
          </div>
          <div className="col-6 col-lg-3">
            <h2 className="h5">Enlaces</h2>
            <ul className="list-unstyled">
              <li>
                <a href="#inicio">Inicio</a>
              </li>
              <li>
                <a href="#catalogo">Catálogo</a>
              </li>
              <li>
                <a href="#ofertas">Ofertas</a>
              </li>
            </ul>
          </div>
          <div className="col-6 col-lg-3">
            <h2 className="h5">Contacto</h2>
            <ul className="list-unstyled footer-text">
              <li>
                <a href="mailto:contacto@gamezone.cl">contacto@gamezone.cl</a>
              </li>
              <li>
                <a href="tel:+56912345678">+56 9 1234 5678</a>
              </li>
            </ul>
          </div>
          <div className="col-12 col-lg-3">
            <h2 className="h5">Síguenos</h2>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                FB
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                IG
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                TW
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom py-3 text-center">
        <p className="mb-0">&copy; 2026 GameZone. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
