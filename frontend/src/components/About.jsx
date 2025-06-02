import aboutImage from "../assets/about.jpg";
import "../styles/About.css";

export default function About() {
  return (
    <section className="about-section">
      <div className="about-container">
        {/* Image */}
        <div className="about-image">
          <img
            src={aboutImage}
            alt="À propos illustration"
          />
        </div>

        {/* Texte */}
        <div className="about-text">
          <h2>A propos de moi</h2>
          <h3>Les murmures de l'âme et des couleurs</h3>
          <p>
            Bienvenue dans mon univers artistique ! Ici, chaque œuvre est une invitation
            à l'émotion et à la découverte. Entre peinture et illustration, mes créations
            sont réalisées avec passion et minutie pour offrir un art unique et authentique.
          </p>
          <button>En savoir plus <span style={{color: "white"}}>❤</span></button>
        </div>
      </div>
    </section>
  );
}
