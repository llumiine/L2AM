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
    alert("Message envoyé ! Nous vous répondrons dans les plus brefs délais 🧁");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1>Une question ? Contactez-moi</h1>
        <p>Je serai ravie de vous répondre et de discuter de vos envies sucrées</p>

        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-details">
              <div className="contact-item">
                <i className="bi bi-geo-alt"></i>
                <p>Paris, France</p>
              </div>
              <div className="contact-item">
                <i className="bi bi-telephone"></i>
                <p>06 XX XX XX XX</p>
              </div>
              <div className="contact-item">
                <i className="bi bi-envelope"></i>
                <p>contact@patisserie.fr</p>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nom</label>
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
              <label htmlFor="email">Email</label>
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
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Votre message..."
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
                rows="4"
              />
            </div>

            <button type="submit">Envoyer le message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
