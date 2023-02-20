import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useLocation } from "react-router-dom";

export default function NavigationBar({ currentUser, setCurrentUser }) {
  const [currentPage, setCurrentPage] = useState("");
  const location = useLocation();

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location]);

  const handleClick = () => {
    setCurrentUser(null);
    localStorage.removeItem("userInfo");
  };

  const getLoginInfo = () => {
    if (currentUser) {
      return `Logged in as: ${currentUser.username}`;
    }
  };

  return (
    <Navbar className="navbar" collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand>
          <Link
            className={`nav-link ${currentPage === "/" ? "active" : ""}`}
            to="/"
          >
            Paw
            <img
              src="https://img.icons8.com/ios/35/null/puppy.png"
              alt="logo"
            />
            Hub
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link
                className={`nav-link ${
                  currentPage === "/explore" ? "active" : ""
                }`}
                to="/explore"
              >
                Explore
              </Link>
            </Nav.Link>

            <Nav.Link>
              <Link
                className={`nav-link ${
                  currentPage === "/discussions" ? "active" : ""
                }`}
                to="/discussions"
              >
                Discussions
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                className={`nav-link ${currentPage === "/map" ? "active" : ""}`}
                to="/map"
              >
                Map
              </Link>
            </Nav.Link>

            <NavDropdown
              title="Resources"
              id="collapsible-nav-dropdown"
              className={
                location.pathname === "/breeds" ||
                location.pathname === "/videos"
                  ? "active"
                  : ""
              }
            >
              <NavDropdown.Item href="/breeds">Breeds</NavDropdown.Item>
              <NavDropdown.Item href="/videos">Videos</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Nav>
            {currentUser && (
              <NavDropdown
                title={getLoginInfo()}
                id="collapsible-nav-dropdown"
                className={location.pathname === "/profile" ? "active" : ""}
              >
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="/discussions" onClick={handleClick}>
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            )}

            {!currentUser && (
              <Nav.Link>
                <Link
                  className={`nav-link ${
                    currentPage === "/login" ? "active" : ""
                  }`}
                  to="/login"
                >
                  Login
                </Link>
              </Nav.Link>
            )}

            {!currentUser && (
              <Nav.Link>
                <Link
                  className={`nav-link ${
                    currentPage === "/signup" ? "active" : ""
                  }`}
                  to="/signup"
                >
                  Signup
                </Link>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
