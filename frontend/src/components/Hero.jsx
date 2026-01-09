import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Hero.css";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const carouselImages = [
    { id: 1, src: "/images/art1.jpg", alt: "Gâteau Fraise Digital" },
    { id: 2, src: "/images/art2.jpg", alt: "Porte-Bijoux Argile" },
    { id: 3, src: "/images/art3.jpg", alt: "Calligraphy Bleu" },
    { id: 4, src: "/images/art4.png", alt: "L'attaque des titans digital" }
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const goToShop = () => {
    navigate("/shop");
  };

  const goToSlide = (index) => setCurrentSlide(index);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);

  return (
    <section id="hero" className="hero-section">
      <div className="hero-shadow" style={{ transform: `translateY(${scrollY * 0.1}px)` }}></div>
      <div className="hero-darkbg"></div>
      <div className="hero-particles"></div>

      <div className="hero-container">
        <div className="hero-text">
          <div className="hero-badge">✨ Artiste Passionnée</div>
          <h1 className="hero-title">
            <span className="hero-title-line">Découvrez mes œuvres uniques,</span>
            <span className="hero-title-line gradient-text">créées avec passion</span>
          </h1>
          <p className="hero-subtitle">
            Explorez un univers artistique où chaque création raconte une histoire unique et émouvante.
          </p>
          <div className="hero-buttons">
            <button className="hero-cta-primary" onClick={goToShop}>
              <span>Voir la collection complète</span>
              <span className="button-icon">✨</span>
            </button>
            <button className="hero-cta-secondary">
              <span>Mon portfolio</span>
              <span className="button-arrow">→</span>
            </button>
          </div>
        </div>

        <div className="hero-image">
          <div className="carousel-container">
            <div className="carousel-wrapper">
              <div className="carousel-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {carouselImages.map((image) => (
                  <div key={image.id} className="carousel-slide">
                    <div className="image-container">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="carousel-image"
                      />
                      <div className="image-shine"></div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="carousel-nav prev" onClick={prevSlide} aria-label="Image précédente">
                <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18L9 12L15 6" />
                </svg>
              </button>

              <button className="carousel-nav next" onClick={nextSlide} aria-label="Image suivante">
                <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18L15 12L9 6" />
                </svg>
              </button>
            </div>

            <div className="carousel-indicators">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${index === currentSlide ? "active" : ""}`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-arrow" onClick={goToShop}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="11" stroke="#364631" strokeWidth="1.5" strokeOpacity="0.6" />
          <path d="M12 6V18M12 18L7 13M12 18L17 13" stroke="#364631" strokeWidth="2" />
        </svg>
        <span className="scroll-text">Découvrir</span>
      </div>
    </section>
  );
}
