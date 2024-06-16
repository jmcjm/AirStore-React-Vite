//this file is a kind of a monster, would need to be completely rewrite and split into different more job-oriented files
//16.06 rewrote the main navbar into react-bootstrap but modals (forms inside them) still needs some work
import React, { useState, useContext, useRef, useEffect } from "react";
import { Modal, Button, Toast, ToastContainer, Navbar, Nav, Container } from "react-bootstrap";
import Logo from "../assets/Base64Logo";
import { NavbarContext } from "../NavbarContext";
import { login, register } from "./ApiConn";
import Cookies from "js-cookie";
import "../index.css";

interface UserCookies {
  cookiesUsername: string;
  cookiesPassword: string;
}

const NavBar: React.FC = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const { navbarHeight } = useContext(NavbarContext);
  const navBarRef = useRef<HTMLDivElement>(null);
  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await login(username, password);
      console.log("Login successful:", response);
      setIsLoggedIn(true);
      setShowLoginModal(false);
      setToastMessage("Login successful!");
      setShowToast(true);
      const userLoggedinCookies: UserCookies[] = [{ cookiesUsername: username, cookiesPassword: password }];
      Cookies.set("login", JSON.stringify(userLoggedinCookies), {
        expires: 7,
        sameSite: "Lax",
      });
    } catch (error) {
      console.error("Login failed:", error);
      setToastMessage("Login failed!");
      setShowToast(true);
    }
  };

  const handleLogout = () => {
    Cookies.remove("login");
    setIsLoggedIn(false);
  };

  const handleSignUp = async () => {
    try {
      const response = await register(username, email, password);
      console.log("Registration successful:", response);
      setShowSignUpModal(false);
      setToastMessage("Registration successful!");
      setShowToast(true);
    } catch (error) {
      console.error("Registration failed:", error);
      setToastMessage("Registration failed!");
      setShowToast(true);
    }
  };


  // Check for login cookies and log in the user automatically if found
  useEffect(() => {
    const cookies = Cookies.get("login");
    if (cookies) {
      const parsedCookies: UserCookies[] = JSON.parse(cookies);
      if (parsedCookies.length > 0) {
        const { cookiesUsername, cookiesPassword } = parsedCookies[0];
        handleLogin(cookiesUsername, cookiesPassword);
      }
    }
  }, []);
  
  // Wrapper function to handle login button click
  const handleLoginButtonClick = () => {
    handleLogin(username, password);
  };

  return (
    //fully rewrote with react-bootstrap instead of pure bootstrap, now I have issues with page fully reloading when clicking links XD
    <Navbar bg="dark" data-bs-theme="dark" expand="md" id="navbar">
      <Container fluid>
        <Navbar.Brand><Logo /> AirStore</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-collapse" />
        <Navbar.Collapse id="navbar-collapse" className='justify-content-end'>
          <Nav>
            <Nav.Link href="/airphone">AirPhone</Nav.Link>
            <Nav.Link href="/airtab">AirTab</Nav.Link>
            <Nav.Link href="/airglass">AirGlass</Nav.Link>
            <Nav.Link href="/cart">🛒</Nav.Link>
            <Container fluid className="m-0 p-0"> {/* buttons needs to be in container in order to don't take 100% width when navbar is collapsed */}
              {isLoggedIn ? (
                <Button
                  variant="outline-light"
                  className="px-3 me-2"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline-light"
                    className="px-3 me-2"
                    onClick={() => setShowLoginModal(true)}
                  >
                    Login
                  </Button>
                  <Button
                    variant="light"
                    className="btn"
                    onClick={() => setShowSignUpModal(true)}
                  >
                    Sign up
                  </Button>
                </>
              )}
            </Container>
          </Nav>
        </Navbar.Collapse>
      </Container>

      {/* Login Modal */}
      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Log in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLoginModal(false)}>
            Close
          </Button>
          <Button variant="dark" onClick={handleLoginButtonClick}>
            Log in
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Sign Up Modal */}
      <Modal show={showSignUpModal} onHide={() => setShowSignUpModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Sign up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="signup-first-name" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="signup-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="signup-email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="signup-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="signup-password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="signup-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSignUpModal(false)}>
            Close
          </Button>
          <Button variant="dark" onClick={handleSignUp}>
            Sign up
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Notification */}
      <ToastContainer position="top-center" className="p-3">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={4000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">AirStore</strong>
            <small>Just now</small>
          </Toast.Header>
          <Toast.Body className="text-light">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Navbar>
  );
};

export default NavBar;

