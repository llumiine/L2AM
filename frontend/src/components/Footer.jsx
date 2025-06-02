import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Colonne 1 */}
        <div>
          <h4>L2AM</h4>
          <p>
            Une boutique d’art dédiée à l’imaginaire et à la douceur.
            Chaque œuvre est faite avec ❤️ et passion.
          </p>
        </div>

        {/* Colonne 2 */}
        <div>
          <h4>Liens utiles</h4>
          <ul>
            <li><a href="#">Boutique</a></li>
            <li><a href="#">À propos</a></li>
            <li><a href="#">Mentions légales</a></li>
          </ul>
        </div>

        {/* Colonne 3 */}
        <div>
          <h4>Contact</h4>
          <p>Email : contact@l2am.art</p>
          <p>Instagram : @l2am.creation</p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} L2AM – Tous droits réservés.
      </div>
    </footer>
  );
}
