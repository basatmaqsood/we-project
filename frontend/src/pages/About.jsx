import React from "react";
import "./About.css";

const About = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-text">
          <h2 className="about-title">About Us</h2>
          <p className="about-description">
            At JADOO Adventures, we bring your travel dreams to life. Our goal is to provide personalized travel experiences that immerse you in the beauty, culture, and wonder of destinations around the world. Whether you're seeking adventure, relaxation, or discovery, we are here to make your journey unforgettable.
          </p>
          <p className="about-description">
            With years of expertise and a passion for exploration, our team ensures you get the best travel packages, guided tours, and exclusive deals tailored to your needs. Discover the world with us, one adventure at a time.
          </p>
        </div>
        <div className="about-image">
          <img src="/tour-images/tour-img01.jpg" alt="About Us" />
        </div>
      </div>
    </section>
  );
};

export default About;
