import avatar from "../assets/kiki.png";
import "../styles/Quote.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Quote() {
  return (
    <section className="quote-section">
      <p className="quote-text">
        “Nous avons tous notre propre talent.<br />
        Il suffit juste de le découvrir.”
      </p>

      <div className="quote-author">
        <img src={avatar} alt="Avatar Kiki" />
        <div className="quote-author-info">
          <div className="font-semibold">Osono</div>
          <div className="italic">Kiki la Petite Sorcière</div>
        </div>
      </div>
    </section>
  );
}
