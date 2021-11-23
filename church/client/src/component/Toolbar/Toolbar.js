import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import Cookies from "universal-cookie";

import "./toolbar.css";
import logo from "./logo.svg";
import { Nav, Navbar, NavbarBrand } from "react-bootstrap";
import image from "../../assets/images/male.jpg";
import { userLogout } from "../../store/redux/actions/userActions";

const cookie = new Cookies();
class toolbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginPage: true,
      currentUser: null,
      logged: false,
    };
  }

  render() {
    const { reducer } = this.props;

    return (
      <>
        <div className="Navbar">
          <Navbar
            bg="dark"
            variant="dark"
            sticky="top"
            expand="sm"
            collapseOnSelect
          >
            <Navbar.Brand>
              <img src={logo} width="40px" height="40px" />
              Logo
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
              <Nav>
                <Nav.Link style={{ marginLeft: 30, fontSize: "large" }}>
                  <Link to="/events">Events</Link>
                </Nav.Link>
                {reducer.isAuthenticated === true ? (
                  <>
                    {reducer.adminrole && (
                      <Nav.Link style={{ marginLeft: 30, fontSize: "large" }}>
                        <Link to="/create">Create</Link>
                      </Nav.Link>
                    )}
                    <>
                      <Nav.Link
                        style={{
                          position: "absolute",
                          right: 0,
                          fontSize: "large",
                          display: "flex",
                          cursor: "pointer",
                        }}
                        onClick={this.props.onDrawerToggleCLicked}
                      >
                        <div className="avatar">
                          <img
                            src={
                              require(`../../assets/images/${reducer.currentUser.photo}`)
                                .default
                            }
                          />
                        </div>
                        {reducer.currentUser.username}
                      </Nav.Link>
                    </>
                  </>
                ) : (
                  <>
                    <Nav.Link style={{ marginLeft: 30, fontSize: "large" }}>
                      <Link to="/user/login">Log In</Link>
                    </Nav.Link>
                    <Nav.Link style={{ marginLeft: 30, fontSize: "large" }}>
                      <Link to="/user/signup">Signup</Link>
                    </Nav.Link>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    reducer: state.AR,
  };
};
const mapStateToDispatch = {
  userLogout,
};
export default connect(
  mapStateToProps,
  mapStateToDispatch
)(withRouter(toolbar));
