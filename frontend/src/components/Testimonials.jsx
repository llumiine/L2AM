import "../styles/Testimonials.css";

const testimonials = [
  {
    id: 1,
    name: "Aline D.",
    text: "Une artiste incroyable, les œuvres sont encore plus belles en vrai ! ❤️",
    avatar: "/src/assets/avatar1.jpg",
  },
  {
    id: 2,
    name: "Lucas M.",
    text: "Ma commande est arrivée rapidement et parfaitement emballée. Merci !",
    avatar: "/src/assets/avatar2.jpg",
  },
  {
    id: 3,
    name: "Sophie T.",
    text: "Les couleurs, les détails… tout respire la poésie. Je recommande !",
    avatar: "/src/assets/avatar3.jpg",
  },
];

export default function Testimonials() {
  return (
    <section className="testimonials-section">
      <div className="testimonials-header">
        <h2>Avis de mes Stars ✨</h2>
        <p>Ils parlent de leur expérience avec mes créations</p>
      </div>

      <div className="testimonials-grid">
        {testimonials.map((t) => (
          <div key={t.id} className="testimonial-card">
            <img src={t.avatar} alt={t.name} />
            <p>“{t.text}”</p>
            <div className="author">{t.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
