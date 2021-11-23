import React, { Component } from "react";
import "./footer.css";

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <footer className="footer-distributed">
          <div className="footer-left">
            <h3>
              <span>STUDENT EVENT</span>
            </h3>

            <p className="footer-company-name">AASTU &copy; 2021</p>
          </div>

          <div className="footer-center">
            <div>
              <i className="fa fa-phone" />
              <p>+2519 46 65 08 39</p>
            </div>

            <div>
              <i className="fa fa-envelope" />
              <p>
                <a href="#">natinigussie7@gmail.com</a>
              </p>
            </div>
          </div>

          <div className="footer-right">
            <p className="footer-company-about">
              <span>About the company</span>
              Developed by 4th year AASTU Software Engineering Students for
              Mahbere Kidusan
            </p>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
