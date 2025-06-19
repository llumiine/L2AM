import React, { useState } from "react";
import "../styles/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message envoyé ! Nous vous répondrons dans les plus brefs délais ✨");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
      <div className="contact-page">
        <div className="contact-container">
          <div className="contact-header">
            <h1>Une question ? Contactez-moi</h1>
            <p>Je serai ravie de vous répondre et de discuter de vos projets artistiques</p>
          </div>

          <div className="contact-content">
            <div className="contact-info">
              <h2>Mes coordonnées</h2>
              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10C21 17L12 23L3 10C3 6 7 2 12 2S21 6 21 10Z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div className="contact-text">
                    <h3>Localisation</h3>
                    <p>Paris, France</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92V19A2 2 0 0 1 20.25 21H19.09C13.19 21 7.52 19.23 3 14.69C-1.52 10.17 -3.29 4.47 -3.29 -1.43A2 2 0 0 1 -1.29 -3.43H1A2 2 0 0 1 3 -1.43V1.05"/>
                    </svg>
                  </div>
                  <div className="contact-text">
                    <h3>Téléphone</h3>
                    <p>06 XX XX XX XX</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div className="contact-text">
                    <h3>Email</h3>
                    <p>contact@l2am.art</p>
                  </div>
                </div>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <h2>Envoyez-moi un message</h2>

              <div className="form-group">
                <label htmlFor="name">Nom complet</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Votre nom"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Adresse email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Sujet</label>
                <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="Sujet de votre message"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                    id="message"
                    name="message"
                    placeholder="Décrivez votre projet ou posez votre question..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                    rows="5"
                />
              </div>

              <button type="submit" className="submit-btn">
                <span>Envoyer le message</span>
                <span className="btn-icon">✨</span>
              </button>
            </form>
          </div>
        </div>
      </div>
  );
};

export default Contact;