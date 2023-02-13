import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

export default function NavigationBar({ currentUser, setCurrentUser }) {
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
    <Navbar collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand>
          <Link className="nav-link" to="/">
            Pawhub
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link className="nav-link" to="/explore">
                Explore
              </Link>
            </Nav.Link>

            <Nav.Link>
              <Link className="nav-link" to="/discussions">
                Discussions
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="nav-link" to="/map">
                Map
              </Link>
            </Nav.Link>

            <NavDropdown title="Resources" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="/breeds">Breeds</NavDropdown.Item>
              <NavDropdown.Item href="/videos">Videos</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Nav>
            {currentUser && (
              <NavDropdown title={getLoginInfo()} id="collapsible-nav-dropdown">
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="/discussions" onClick={handleClick}>
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            )}

            {!currentUser && (
              <Nav.Link>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </Nav.Link>
            )}

            {!currentUser && (
              <Nav.Link>
                <Link className="nav-link" to="/signup">
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
