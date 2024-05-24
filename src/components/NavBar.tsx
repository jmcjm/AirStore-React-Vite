import ReactSvg from "../assets/react.svg";

function NavBar() {
  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <a className="navbar-brand me-2" href="#">
          <img src={ReactSvg} height="16" alt="Logo" loading="lazy" />
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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Laptops
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Phones
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Tablets
              </a>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            <button
              data-mdb-ripple-init
              type="button"
              className="btn btn-link px-3 me-2"
            >
              Login
            </button>
            <button
              data-mdb-ripple-init
              type="button"
              className="btn btn-primary me-3"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
