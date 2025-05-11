import React from "react";
import { Link } from "react-router-dom";

function Navbar({ toggleSidebar }) {
  return (
    <nav className="navbar bg-light px-3">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        <button
          className="navbar-toggler d-md-block d-lg-block border-0"
          type="button"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <Link className="navbar-brand mx-3" to="#">
          Navbar
        </Link>

        <form
          className="d-flex ms-auto"
          role="search"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-info" type="submit">
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}

export default Navbar;
