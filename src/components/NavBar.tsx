import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import ReactSvg from '../assets/react.svg';

function NavBar() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const handleLogin = () => {
    // Logika logowania
    setShowLoginModal(false);
  };

  const handleSignUp = () => {
    // Logika rejestracji
    setShowSignUpModal(false);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand me-2" href="#">
          <img src={ReactSvg} height="16" alt="Logo" loading="lazy" /> AirShop
        </a>

        <button
          data-mdb-collapse-init
          className="navbar-toggler"
          type="button"
          data-mdb-target="#navbarButtonsExample"
          aria-controls="navbarButtonsExample"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarButtonsExample">
          <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">
                AirPhone
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                AirGlass
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                AirTab
              </a>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            <button
              data-mdb-ripple-init
              type="button"
              className="btn btn-link px-3 me-2"
              onClick={() => setShowLoginModal(true)}
            >
              Login
            </button>
            <button
              data-mdb-ripple-init
              type="button"
              className="btn btn-primary me-3"
              onClick={() => setShowSignUpModal(true)}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>

      {/* Modal logowania */}
      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)}>
        <Modal.Header closeButton className="bg-dark text-light">
          <Modal.Title>Log in</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light">
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" required />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" required />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer className="bg-dark">
          <Button variant="secondary" onClick={() => setShowLoginModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleLogin}>Log in</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal rejestracji */}
      <Modal show={showSignUpModal} onHide={() => setShowSignUpModal(false)}>
        <Modal.Header closeButton className="bg-dark text-light">
          <Modal.Title>Sign up</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light">
          <form>
          <div className="mb-3">
              <label htmlFor="signup-first-name" className="form-label">First name</label>
              <input type="string" className="form-control" id="signup-first-name" required />
            </div>
            <div className="mb-3">
              <label htmlFor="signup-last-name" className="form-label">Last name</label>
              <input type="string" className="form-control" id="signup-last-name" required />
            </div>
            <div className="mb-3">
              <label htmlFor="signup-email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="signup-email" required />
            </div>
            <div className="mb-3">
              <label htmlFor="signup-password" className="form-label">Password</label>
              <input type="password" className="form-control" id="signup-password" required />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer className="bg-dark">
          <Button variant="secondary" onClick={() => setShowSignUpModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleSignUp}>Sign up</Button>
        </Modal.Footer>
      </Modal>
    </nav>
  );
}

export default NavBar;
