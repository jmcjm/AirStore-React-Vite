import React, { useState, useContext, useRef, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Logo from "../assets/Base64Logo";
import { Link, useLocation } from "react-router-dom";
import { NavbarContext } from "../NavbarContext";
import { login } from "./ApiConn";
import "../index.css";

const NavBar: React.FC = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    !!localStorage.getItem("token")
  );
  const { navbarHeight } = useContext(NavbarContext);
  const [isOpen, setIsOpen] = useState(false);
  const navBarRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogin = async () => {
    try {
      const response = await login(username, password);
      console.log("Login successful:", response);
      setIsLoggedIn(true); // Set logged in state
      setShowLoginModal(false);
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login failure (e.g., show error message)
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const handleSignUp = () => {
    // Handle sign up logic
    setShowSignUpModal(false);
  };

  const handleLinkClick = () => {
    if (navBarRef.current && window.innerWidth < 992) {
      const toggleButton = navBarRef.current.querySelector(
        ".navbar-toggler"
      ) as HTMLElement;
      if (
        toggleButton &&
        toggleButton.getAttribute("aria-expanded") === "true"
      ) {
        toggleButton.click();
      }
    }
  };

  // Listen for route changes to close the menu
  useEffect(() => {
    if (navBarRef.current && window.innerWidth < 992) {
      const toggleButton = navBarRef.current.querySelector(
        ".navbar-toggler"
      ) as HTMLElement;
      if (
        toggleButton &&
        toggleButton.getAttribute("aria-expanded") === "true"
      ) {
        toggleButton.click();
      }
    }
  }, [location]);

  return (
    <nav
      id="navbar"
      className="navbar navbar-expand-lg bg-body-tertiary"
      data-bs-theme="dark"
      ref={navBarRef}
    >
      <div className="container-fluid">
        <Link to="/" className="navbar-brand me-2" onClick={handleLinkClick}>
          <Logo /> AirShop
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarNav"
          aria-expanded={isOpen ? "true" : "false"}
          aria-label="Toggle navigation"
          onClick={toggleMenu}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav mb-2 me-2 mb-lg-0 ms-auto">
            <li className="nav-item">
              <Link
                to="/airphone"
                className="nav-link"
                onClick={handleLinkClick}
              >
                AirPhone
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/airtab" className="nav-link" onClick={handleLinkClick}>
                AirTab
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/airglass"
                className="nav-link"
                onClick={handleLinkClick}
              >
                AirGlass
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/cart" className="nav-link" onClick={handleLinkClick}>
                🛒
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center">
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
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)}>
        <Modal.Header
          closeButton
          data-bs-theme="dark"
          className="bg-dark text-light"
        >
          <Modal.Title>Log in</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light">
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
        <Modal.Footer className="bg-dark">
          <Button variant="secondary" onClick={() => setShowLoginModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleLogin}>
            Log in
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Sign Up Modal */}
      <Modal show={showSignUpModal} onHide={() => setShowSignUpModal(false)}>
        <Modal.Header
          closeButton
          data-bs-theme="dark"
          className="bg-dark text-light"
        >
          <Modal.Title>Sign up</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light">
          <form>
            <div className="mb-3">
              <label htmlFor="signup-first-name" className="form-label">
                First name
              </label>
              <input
                type="text"
                className="form-control"
                id="signup-first-name"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="signup-last-name" className="form-label">
                Last name
              </label>
              <input
                type="text"
                className="form-control"
                id="signup-last-name"
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
                required
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer className="bg-dark">
          <Button variant="secondary" onClick={() => setShowSignUpModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSignUp}>
            Sign up
          </Button>
        </Modal.Footer>
      </Modal>
    </nav>
  );
};

export default NavBar;
