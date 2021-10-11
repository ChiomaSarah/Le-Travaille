import React from "react";
import { Link } from "react-router-dom";
import useToken from "../useToken";

function Navbar() {
  const { token } = useToken();

  return (
    <nav className="navbar bg-dark">
    <Link to="/" className="link text-light">
      <h3 className="text-light">Le Travaille</h3>
      </Link>
      <h6>
        <Link to="/" className="link text-light">
          Home
        </Link>
      </h6>
      <h6>
        <Link to="/jobs" className="link text-light">
          Jobs
        </Link>
      </h6>

      {token ? (
        <h6>
          <Link to="/user/dashboard" className="link text-light">
            Dashboard
          </Link>
        </h6>
      ) : (
        <h6>
          <Link to="/job_seeker" className="link text-light">
            Job Seeker
          </Link>
        </h6>
      )}

      {!token ? null : (
        <h6>
          <Link to="/auth/logout" className="link text-light">
           Logout
          </Link>
        </h6>
      )}
    </nav>
  );
}
export default Navbar;
