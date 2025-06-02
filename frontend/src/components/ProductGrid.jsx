import "../styles/ProductGrid.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const products = [
  {
    id: 1,
    title: "Papillons roses",
    price: "29 €",
    image: "/src/assets/art1.jpg",
  },
  {
    id: 2,
    title: "Univers floral",
    price: "35 €",
    image: "/src/assets/art2.jpg",
  },
  {
    id: 3,
    title: "Forêt magique",
    price: "40 €",
    image: "/src/assets/art3.jpg",
  },
  {
    id: 4,
    title: "Rêverie nocturne",
    price: "45 €",
    image: "/src/assets/art4.jpg",
  },
  {
    id: 5,
    title: "Aurore boréale",
    price: "38 €",
    image: "/src/assets/art5.jpg",
  },
  {
    id: 6,
    title: "Jardin zen",
    price: "42 €",
    image: "/src/assets/art6.jpg",
  },
  
];

export default function ProductGrid() {
  return (
    <section className="product-section">
      <div className="product-header">
        <h2>Les plus populaires</h2>
        <p>Mes œuvres les plus appréciées par la communauté</p>
      </div>

      <div className="row row-cols-1 row-cols-md-3 gx-1 g-4">
        {products.map((product) => (
          <div className="col" key={product.id}>
            <div className="card h-100 custom-card">
              <img src={product.image} className="card-img-top" alt={product.title} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text fw-bold text-pink mb-2">{product.price}</p>
                <div className="mt-auto d-flex align-items-center justify-content-between w-100">
                  <a href="#" className="btn btn-success btn-sm custom-btn">Voir plus</a>
                  <button className="btn btn-outline-danger rounded-circle custom-cart-btn ms-2" aria-label="Ajouter au panier">
                    <i className="bi bi-cart"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
