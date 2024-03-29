import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

function Footer() {
  return (
    <div className="footer-container">
      <section className="footer-subscription">
        <p className="footer-subscription-heading">
          Sign up now, to receive the best jobs out there.
        </p>
        <p className="footer-subscription-text">
          Don't have an account ?
          <br />
          <br />{" "}
          <Button
            className="btn btn-light footer-btn"
            style={{ background: "#f7e6da" }}
          >
            <a
              href="/auth/register"
              style={{ color: "#000", fontWeight: "bolder" }}
            >
              REGISTER HERE
            </a>
          </Button>
        </p>
      </section>
      <div className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h5>About Us</h5>

            <Link to="/jobs">Jobs</Link>
          </div>
        </div>

        <div className="footer-link-items">
          <h5>Contact Us</h5>

          <a
            target="_blank"
            href="https://www.linkedin.com/in/sarah-osuji-a5821b121/"
            className="icon"
            rel="noreferrer"
          >
            <i
              className="fab fa-linkedin-in pr-2"
              style={{ fontSize: "18px", color: "#0066ff" }}
            ></i>
            LinkedIn
          </a>

          <a
            target="_blank"
            href="https://twitter.com/Honeylyte"
            className="icon"
            rel="noreferrer"
          >
            <i
              className="fab fa-twitter-square pr-2"
              style={{ fontSize: "18px", color: "#0099ff" }}
            ></i>
            Twitter
          </a>
        </div>
      </div>

      <section className="copyright">
        <div>
          <small>
            Le-Travaille
            <img
              src="https://i.ibb.co/QKBZTZ8/1630280532644.jpg"
              className="pl-1 copyright-img"
              width="40px"
              height="25px"
              alt="logo"
            />{" "}
            © 2021. All Rights Reserved.
          </small>
        </div>
      </section>
    </div>
  );
}

export default Footer;
