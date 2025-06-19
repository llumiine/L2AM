import React from 'react';
import "../styles/Testimonials.css";

const testimonials = [
  {
    id: 1,
    name: "Sarah",
    rating: 4,
    date: "01/03/2025"
  },
  {
    id: 2,
    name: "Milena",
    rating: 5,
    date: "05/01/2025"
  },
  {
    id: 3,
    name: "Catherine",
    rating: 5,
    date: "16/12/2024"
  },
  {
    id: 4,
    name: "Michael Jackson",
    rating: 5,
    date: "23/11/2024"
  }
];

export default function Testimonials() {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i} className="star filled">★</span>);
      } else {
        stars.push(<span key={i} className="star empty">★</span>);
      }
    }
    return stars;
  };

  return (
      <section className="testimonials-section">
        <div className="testimonials-container">
          <h2 className="testimonials-title">Que disent mes Stars ✨</h2>

          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="testimonial-card">
                  <div className="stars-row">
                    {renderStars(testimonial.rating)}
                  </div>

                  <h3 className="card-title">Review title</h3>
                  <p className="card-subtitle">Review body</p>

                  <div className="profile-section">
                    <div className="profile-avatar">
                      <span>{testimonial.name.charAt(0)}</span>
                    </div>
                    <div className="profile-text">
                      <div className="profile-name">{testimonial.name}</div>
                      <div className="profile-date">{testimonial.date}</div>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </section>
  );
}