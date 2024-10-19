import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about">
      <header className="about-header">
        <h1>About Goal Cricbet</h1>
      </header>
      
      <section className="about-section">
        <h2>What is Goal Cricbet?</h2>
        <p>
          Goal Cricbet is a cutting-edge betting application designed for cricket enthusiasts. 
          Our app provides a comprehensive platform for placing bets, tracking betting history, 
          and enjoying a seamless betting experience.
        </p>
      </section>

      <section className="about-section">
        <h2>Our Goals</h2>
        <p>
          Our primary goal is to provide a user-friendly and secure environment for cricket betting.
          We aim to offer real-time updates, accurate odds, and a variety of betting options to enhance
          your betting experience.
        </p>
      </section>

      <section className="about-section">
        <h2>Features</h2>
        <ul>
          <li>Real-time match updates and live odds.</li>
          <li>Easy-to-use interface for quick bets.</li>
          <li>Detailed betting history and statistics.</li>
          <li>Secure and reliable transactions.</li>
          <li>24/7 customer support for assistance.</li>
        </ul>
      </section>
    </div>
  );
};

export default About;
