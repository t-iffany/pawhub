import React from "react";
import { Link } from "react-router-dom";

const styles = {
  footer: {
    backgroundColor: "transparent",
    color: "white",
    padding: "20px 0",
  },
  container: {
    bottom: "0",
    display: "flex",
    justifyContent: "center",
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
        <p style={styles.copyright}>Copyright &copy; 2023 Pawhub</p>
        <div style={styles.links}></div>
      </div>
    </footer>
  );
};

export default Footer;
