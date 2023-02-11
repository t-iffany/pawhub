import React from "react";
import { Link } from "react-router-dom";

const styles = {
  footer: {
    backgroundColor: "transparent",
    color: "white",
    padding: "20px 0",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "960px",
    margin: "0 auto",
  },
  copyright: {
    fontSize: "14px",
  },
  links: {
    display: "flex",
  },
};

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <p style={styles.copyright}>Copyright &copy; 2023 Company Name</p>
        <div style={styles.links}>
          <Link to="#">About</Link>
          <Link to="#">Contact</Link>
          <Link to="#">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;