import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

export default function NavigationBar({ currentUser, setCurrentUser }) {
  const handleClick = () => {
    setCurrentUser(null);
    localStorage.removeItem("userInfo");
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
              <Link className="nav-link" to="/resources">
                Resources
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



          </Nav>

          <Nav>
            <Nav.Link>
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
            </Nav.Link>

            {!currentUser && (
              <Nav.Link>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </Nav.Link>
            )}

            {currentUser && (
              <Nav.Link>
                <Link
                  className="nav-link"
                  to="/discussions"
                  onClick={handleClick}
                >
                  Log out
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
