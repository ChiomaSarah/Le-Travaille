import React from "react";
import { Link } from "react-router-dom";
import useToken from "../useToken";

function Navbar() {
  const { token } = useToken();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <Link to="/">
        <h4 className="text-light navbar-brand">Le-Travaille</h4>
      </Link>

      <button
        className="navbar-toggler bg-light"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <Link to="/" className="nav-link text-light">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/jobs" className="nav-link text-light">
              Jobs
            </Link>
          </li>

          {token ? (
            <li className="nav-item">
              <Link to="/user/dashboard" className="nav-link text-light">
                Dashboard
              </Link>
            </li>
          ) : (
            <li className="nav-item">
              <Link to="/job_seeker" className="nav-link text-light">
                Job Seeker
              </Link>
            </li>
          )}

          {!token ? null : (
            <li className="nav-item">
              <Link to="/auth/logout" className="nav-link text-light">
                Logout
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;
