import React, { useEffect, useState } from 'react';
import "../styles/Testimonials.css";

export default function Testimonials() {
  const [commentaires, setCommentaires] = useState([]);

 useEffect(() => {
  const timestamp = Date.now();
  fetch(`http://localhost:9090/api/commentaires/avec-utilisateur?t=${timestamp}`)
    .then(res => res.json())
    .then(data => {
      console.log("Données reçues:", data);
      setCommentaires(data);
    })
    .catch(err => console.error("Erreur chargement commentaires:", err));
}, []);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={`star ${i < rating ? 'filled' : 'empty'}`}>★</span>
    ));
  };

  
  const getNomComplet = (commentaire) => {
    if (commentaire.prenomUtilisateur && commentaire.nomUtilisateur) {
      return `${commentaire.prenomUtilisateur} ${commentaire.nomUtilisateur}`;
    }
    return commentaire.nomUtilisateur || "Utilisateur anonyme";
  };

  const getInitiale = (commentaire) => {
    if (commentaire.prenomUtilisateur) {
      return commentaire.prenomUtilisateur.charAt(0).toUpperCase();
    }
    if (commentaire.nomUtilisateur) {
      return commentaire.nomUtilisateur.charAt(0).toUpperCase();
    }
    return 'U';
  };

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <h2 className="testimonials-title">Que disent mes Stars ✨</h2>

        <div className="testimonials-grid">
          {commentaires.length === 0 ? (
            <p>Aucun commentaire pour le moment.</p>
          ) : (
            commentaires.slice(-4).reverse().map((c) => (
              <div key={c.id} className="testimonial-card">
                <div className="stars-row">
                  {renderStars(c.note)}
                </div>

                <h3 className="card-title">Avis client</h3>
                <p className="card-subtitle">{c.commentaire}</p>

                <div className="profile-section">
                  <div className="profile-avatar">
                    <span>{getInitiale(c)}</span>
                  </div>
                  <div className="profile-text">
                    <div className="profile-name">{getNomComplet(c)}</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}