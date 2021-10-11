import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-container">
      <section className="footer-subscription">
        <p className="footer-subscription-heading">
          Sign up now, to receive the best jobs out there.
        </p>
        <p className="footer-subscription-text">
          Not yet a member,
          <br />
          <br />
          <a href="/auth/register" target="_blank" rel="noreferrer">
            {" "}
            <button
              className="btn btn-light "
              style={{ background: "#ddd", fontWeight: "bold" }}
            >
              REGISTER HERE
            </button>
          </a>
        </p>
      </section>
      <div className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h3>About Us</h3>

            <Link to="/jobs">Careers</Link>
          </div>
        </div>

        <div className="footer-link-items">
          <h3>Contact Us</h3>

          <a
            target="_blank"
            href="https://www.linkedin.com/in/sarah-osuji-a5821b121/"
            className="icon"
            rel="noreferrer"
          >
            <i
              className="fab fa-linkedin-in pr-2"
              style={{ fontSize: "28px", color: "#0066ff" }}
            ></i>
            Linkedin
          </a>

          <a
            target="_blank"
            href="https://twitter.com/Honeylyte"
            className="icon"
            rel="noreferrer"
          >
            <i
              className="fab fa-twitter-square pr-2"
              style={{ fontSize: "28px", color: "#0099ff" }}
            ></i>
            Twitter
          </a>
        </div>
      </div>

      <section className="social-media">
        <div className="social-media-wrap">
          <div className="footer-logo">
            <Link to="/" className="social-logo">
              Le Travaille
              <img
                src="https://i.ibb.co/QKBZTZ8/1630280532644.jpg"
                className="pl-2"
                width="60px"
                height="50px"
                alt="logo"
              />
            </Link>
          </div>
          <small className="website-rights">Le Travaille © 2021</small>
        </div>
      </section>
    </div>
  );
}

export default Footer;
