import React from "react";
import Hero from "../components/Hero";
import Quote from "../components/Quote";
import About from "../components/About";
import ProductGrid from "../components/ProductGrid";
import Testimonials from "../components/Testimonials";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <Quote />
      <About />
      <ProductGrid />
      <Testimonials />
    </div>
  );
};

export default Home;
