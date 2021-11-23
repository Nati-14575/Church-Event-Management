import React from "react";
import { connect } from "react-redux";
import { Component } from "react";
import { Link } from "react-router-dom";
import classes from "./login.module.css";
import "./login.css";

import { userLogin } from "../../../store/redux/actions/userActions";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

class login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  onChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.userLogin({ email, password }, this.props.history);
  };

  render() {
    const { UI } = this.props;
    return (
      <React.Fragment>
        <>
          <div style={{ height: "1500px" }}>
            <form class="form" onSubmit={this.handleSubmit}>
              <div class="title">Login</div>
              <div class="subtitle">Login to your account</div>
              {UI.error !== null && (
                <div className={classes.error}>{UI.error}</div>
              )}
              <div class="input-container ic1">
                <input
                  type="email"
                  required
                  class="input"
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                />
                <div class="cut"></div>
                <label for="firstname" class="placeholder">
                  Email
                </label>
              </div>
              <div class="input-container ic2">
                <input
                  type="password"
                  class="input"
                  required
                  value={this.state.password}
                  onChange={this.onChangePassword}
                />
                <div class="cut"></div>
                <label for="password" class="placeholder">
                  Password
                </label>
              </div>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{
                  backgroundColor: "#08d",
                  borderRadius: "12px",
                  border: 0,
                  boxSizing: "border-box",
                  color: "#eee",
                  cursor: "pointer",
                  fontSize: "18px",
                  height: "50px",
                  marginTop: "38px",
                  outline: 0,
                  textAlign: "center",
                  width: "70%",
                }}
                disabled={UI.loading && true}
              >
                login
                {UI.loading && (
                  <CircularProgress
                    className={classes.progress}
                    size={25}
                  ></CircularProgress>
                )}
              </Button>
              <div
                style={{
                  background: "transparent",
                  color: "white",
                  marginTop: "10px",
                  fontSize: "large",
                }}
              >
                <label>Don't have an account?</label>
                <Link to="/user/signup">Sign Up</Link>
              </div>
              <div>
                <Link to="/users/forgotpassword">forgot password?</Link>
              </div>
            </form>
          </div>
        </>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return { UI: state.UI };
};

const mapStateToDispatch = {
  userLogin,
};

export default connect(mapStateToProps, mapStateToDispatch)(login);
