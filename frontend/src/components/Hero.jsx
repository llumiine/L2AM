import React, { useState, useEffect } from 'react';
import "../styles/Hero.css";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Images du carousel
  const carouselImages = [
    {
      id: 1,
      src: "/src/assets/hero1.jpg",
      alt: "Portrait artistique avec masque et papillons"
    },
    {
      id: 2,
      src: "/src/assets/hero2.jpg",
      alt: "Création artistique colorée"
    },
    {
      id: 3,
      src: "/src/assets/hero3.jpg",
      alt: "Œuvre d'art unique"
    },
    {
      id: 4,
      src: "/src/assets/hero4.jpg",
      alt: "Art contemporain"
    }
  ];

  // Effet parallax
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotation du carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000); // Change toutes les 4 secondes

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const handleScroll = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }
  };

  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  return (
      <section id="hero" className="hero-section">
        {/* Overlays avec effet parallax */}
        <div
            className="hero-shadow"
            style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        ></div>
        <div className="hero-darkbg"></div>

        {/* Particules en arrière-plan */}
        <div className="hero-particles"></div>

        <div className="hero-container">
          {/* Texte amélioré */}
          <div className="hero-text">
            <div className="hero-badge">
              ✨ Artiste Passionnée
            </div>

            <h1 className="hero-title">
              <span className="hero-title-line">Découvrez mes œuvres uniques,</span>
              <span className="hero-title-line gradient-text">créées avec passion</span>
            </h1>

            <p className="hero-subtitle">
              Explorez un univers artistique où chaque création raconte une histoire unique et émouvante.
            </p>

            <div className="hero-buttons">
              <button className="hero-cta-primary" onClick={scrollToProducts}>
                <span>Voir la collection complète</span>
                <span className="button-icon">✨</span>
              </button>

              <button className="hero-cta-secondary">
                <span>Mon portfolio</span>
                <span className="button-arrow">→</span>
              </button>
            </div>
          </div>

          {/* Carousel d'images */}
          <div className="hero-image">
            <div className="carousel-container">
              <div className="carousel-wrapper">
                {/* Images du carousel */}
                <div
                    className="carousel-track"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {carouselImages.map((image, index) => (
                      <div key={image.id} className="carousel-slide">
                        <div className="image-container">
                          <img
                              src={image.src}
                              alt={image.alt}
                              className="carousel-image"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                          />
                          {/* Fallback si image ne charge pas */}
                          <div className="image-placeholder" style={{ display: 'none' }}>
                            Portrait artistique {index + 1}
                          </div>

                          {/* Effet de reflet */}
                          <div className="image-shine"></div>
                        </div>

                        {/* Papillons animés */}
                        <div className="butterfly butterfly-1" data-delay="0s">🦋</div>
                        <div className="butterfly butterfly-2" data-delay="0.5s">🦋</div>
                        <div className="butterfly butterfly-3" data-delay="1s">🦋</div>
                        <div className="butterfly butterfly-4" data-delay="1.5s">🦋</div>
                      </div>
                  ))}
                </div>

                {/* Boutons de navigation */}
                <button
                    className="carousel-nav prev"
                    onClick={prevSlide}
                    aria-label="Image précédente"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18L9 12L15 6"/>
                  </svg>
                </button>

                <button
                    className="carousel-nav next"
                    onClick={nextSlide}
                    aria-label="Image suivante"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18L15 12L9 6"/>
                  </svg>
                </button>
              </div>

              {/* Indicateurs (dots) */}
              <div className="carousel-indicators">
                {carouselImages.map((_, index) => (
                    <button
                        key={index}
                        className={`indicator ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Aller à l'image ${index + 1}`}
                    />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Flèche animée améliorée */}
        <div className="scroll-arrow" onClick={handleScroll}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="11" stroke="#364631" strokeWidth="1.5" strokeOpacity="0.6"/>
            <path d="M12 6V18M12 18L7 13M12 18L17 13" stroke="#364631" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="scroll-text">Découvrir</span>
        </div>
      </section>
  );
}