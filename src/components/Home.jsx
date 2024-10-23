import React from "react";
import { motion } from "framer-motion";
import "./Home.css";


const Home = () => {
  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif", // Font family for modern look
        lineHeight: 1.6,
        color: "var(--text-color)", // Dynamic color for text
        backgroundColor: "var(--background-color)", // Dynamic background color
      }}
    >
      <header
        style={{
          backgroundColor: "var(--header-background-color)", // Dynamic header background
          color: "var(--header-text-color)", // Dynamic header text color
          padding: "3rem 2rem",
          textAlign: "center",
          borderBottom: "5px solid var(--accent-color)", // Accent color for bottom border
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            marginBottom: "1.5rem",
            fontWeight: "bold",
          }}
        >
          Welcome to OnPaper
        </h1>
        <p
          style={{
            fontSize: "1.3rem",
            marginBottom: "2rem",
            color: "white", // White text for "Master the art of trading..."
          }}
        >
          Master the art of trading without risking real money
        </p>
        <a
          href="/register"
          style={{
            backgroundColor: "var(--button-background-color)", // Dynamic button color
            color: "var(--button-text-color)", // Dynamic button text
            padding: "0.8rem 1.5rem",
            borderRadius: "30px",
            textDecoration: "none",
            fontWeight: "bold",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.6)",
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = "var(--button-hover-color)")
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = "var(--button-background-color)")
          }
        >
          Start Trading Now
        </a>
      </header>

      <section id="features" style={{ padding: "4rem 2rem" }}>
        <h2
          style={{
            textAlign: "center",
            fontSize: "2.5rem",
            marginBottom: "3rem",
            color: "var(--header-background-color)", // Matching color scheme
          }}
        >
          Why Choose OnPaper?
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          <FeatureCard
            title="Real-Time Market Data"
            description="Practice with up-to-the-minute market information"
          />
          <FeatureCard
            title="Risk-Free Trading"
            description="Learn and experiment without financial consequences"
          />
          <FeatureCard
            title="Community Support"
            description="Connect with fellow traders and share insights"
          />
        </div>
      </section>

      <section
        id="services"
        style={{
          backgroundColor: "var(--section-background-color)",
          padding: "4rem 2rem",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "2.5rem",
            marginBottom: "3rem",
            color: "var(--header-background-color)",
          }}
        >
          Our Services
        </h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          <ServiceCard
            title="Paper Trading"
            description="Practice trading stocks, options, and cryptocurrencies with virtual money."
          />
          <ServiceCard
            title="Market Analysis"
            description="Access powerful tools for technical and fundamental analysis."
          />
          <ServiceCard
            title="Trading Education"
            description="Learn trading strategies and risk management techniques from experts."
          />
          <ServiceCard
            title="Portfolio Management"
            description="Track and optimize your virtual portfolio performance over time."
          />
        </div>
      </section>

      <section
        id="contact"
        style={{ padding: "4rem 2rem", textAlign: "center" }}
      >
        <h2
          style={{
            fontSize: "2.5rem",
            marginBottom: "2rem",
            color: "var(--header-background-color)",
          }}
        >
          Ready to Start?
        </h2>
        <p style={{ fontSize: "1.3rem", marginBottom: "2rem" }}>
          Join thousands of traders who have sharpened their skills with
          PaperTrade Pro
        </p>
        <a
          href="/register"
          style={{
            backgroundColor: "var(--button-background-color)",
            color: "var(--button-text-color)",
            padding: "0.8rem 1.5rem",
            borderRadius: "30px",
            textDecoration: "none",
            fontWeight: "bold",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) =>
            (e.target.style.backgroundColor = "var(--button-hover-color)")
          }
          onMouseLeave={(e) =>
            (e.target.style.backgroundColor = "var(--button-background-color)")
          }
        >
          Sign Up Now
        </a>
      </section>

      <footer
        style={{
          backgroundColor: "var(--header-background-color)",
          color: "white",
          padding: "1.5rem",
          textAlign: "center",
        }}
      >
        <p>&copy; 2024 PaperTrade Pro. All rights reserved.</p>
      </footer>
    </div>
  );
};

// Updated FeatureCard with improved styling
const FeatureCard = ({ title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false }}
      style={{
        backgroundColor: "var(--card-background-color)",
        padding: "1.5rem",
        borderRadius: "10px",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
        margin: "1.5rem",
        maxWidth: "320px",
        textAlign: "center",
        color: "var(--feature-card-text-color)", // Feature card text color for both modes
      }}
    >
      <h3
        style={{
          fontSize: "1.4rem",
          marginBottom: "1rem",
          color: "var(--header-background-color)",
        }}
      >
        {title}
      </h3>
      <p>{description}</p>
    </motion.div>
  );
};

// Updated ServiceCard with improved styling
const ServiceCard = ({ title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false }}
      style={{
        backgroundColor: "var(--card-background-color)",
        padding: "1.5rem",
        borderRadius: "10px",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
        margin: "1.5rem",
        maxWidth: "320px",
        textAlign: "center",
        color: "var(--text-color)", // Text color for service cards
      }}
    >
      <h3
        style={{
          fontSize: "1.4rem",
          marginBottom: "1rem",
          color: "var(--header-background-color)",
        }}
      >
        {title}
      </h3>
      <p>{description}</p>
    </motion.div>
  );
};

export default Home;
