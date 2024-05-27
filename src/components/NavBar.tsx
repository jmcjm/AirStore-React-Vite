import React, { useState, useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import ReactSvg from "../assets/react.svg";
import { Link } from "react-router-dom";
import { NavbarContext } from "../NavbarContext";
import "../index.css";

function NavBar() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const { navbarHeight } = useContext(NavbarContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogin = () => {
    // Handle login logic
    setShowLoginModal(false);
  };

  const handleSignUp = () => {
    // Handle sign up logic
    setShowSignUpModal(false);
  };

  return (
    <nav
      id="navbar"
      className="navbar navbar-expand-lg bg-body-tertiary"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link to="/" className="navbar-brand me-2">
          <img src={ReactSvg} height="16" alt="Logo" loading="lazy" /> AirShop
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
              <Link to="/airphone" className="nav-link">
                AirPhone
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/airtab" className="nav-link">
                AirTab
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/airglass" className="nav-link">
                AirGlass
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            <button
              type="button"
              className="btn btn-outline-light px-3 me-2"
              onClick={() => setShowLoginModal(true)}
            >
              Login
            </button>
            <button
              type="button"
              className="btn btn-light"
              onClick={() => setShowSignUpModal(true)}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)}>
        <Modal.Header closeButton className="bg-dark text-light">
          <Modal.Title>Log in</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light">
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
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
        <Modal.Header closeButton className="bg-dark text-light">
          <Modal.Title>Sign up</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light">
          <form>
            <div className="mb-3">
              <label htmlFor="signup-first-name" className="form-label">
                First name
              </label>
              <input
                type="string"
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
                type="string"
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
}

export default NavBar;
