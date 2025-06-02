import heroImage from "../assets/hero.png";
import "../styles/Hero.css";

export default function Hero() {
  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="hero-section">
      <div className="hero-shadow"></div>
      <div className="hero-darkbg"></div>
      <div className="hero-container">
        {/* Texte */}
        <div className="hero-text">
          <h1>
            Découvrez mes œuvres uniques,<br />créées avec passion
          </h1>
          <button>
            Voir la collection complète
          </button>
        </div>

        {/* Image */}
        <div className="hero-image">
          <img src={heroImage} alt="Femme créative" />
        </div>
      </div>

      {/* Flèche animée */}
      <div className="scroll-arrow" onClick={handleScroll}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="11" stroke="#364631" strokeWidth="1.5" strokeOpacity="0.6"/>
          <path d="M12 6V18M12 18L7 13M12 18L17 13" stroke="#364631" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 6V18M12 18L7 13M12 18L17 13" stroke="#364631" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8"/>
        </svg>
      </div>
    </section>
  );
}
