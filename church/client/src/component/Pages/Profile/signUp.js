import React, { Component } from "react";
import classes from "./form.module.css";
import "./login.css";
import { connect } from "react-redux";
import { userSignup } from "../../../store/redux/actions/userActions";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

class signup extends Component {
  constructor(props) {
    super(props);

    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: "",
      username: "",
      password: "",
      gender: "",
      confirm_password: "",
      location: "",
    };
  }

  onChangeUserName = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  onChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  onChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  onChangeConfirmPassword = (event) => {
    this.setState({
      confirm_password: event.target.value,
    });
  };
  onChangeLocation = (event) => {
    this.setState({
      location: event.target.value,
    });
  };

  onChangeMale = () => {
    this.setState({
      gender: "male",
    });
  };

  onChangeFeMale = () => {
    this.setState({
      gender: "female",
    });
  };
  onSubmit = (event) => {
    event.preventDefault();

    const userData = {
      ...this.state,
    };

    this.props.userSignup(userData, this.props.history);
  };

  render() {
    const { UI } = this.props;
    return (
      <React.Fragment>
        <>
          <div style={{ width: "100%", height: "100%" }}>
            <form class="form" onSubmit={this.onSubmit}>
              <div class="title">Welcome</div>
              <div class="subtitle">Let's create your account!</div>
              {UI.error !== null && (
                <div className={classes.error}>{UI.error}</div>
              )}
              <div class="input-container ic1">
                <input
                  type="text"
                  required
                  class="input"
                  value={this.state.username}
                  onChange={this.onChangeUserName}
                />
                <div class="cut"></div>
                <label for="firstname" class="placeholder">
                  User name
                </label>
              </div>
              <div class="input-container ic2">
                <input
                  type="email"
                  required
                  class="input"
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                />
                <div class="cut"></div>
                <label for="lastname" class="placeholder">
                  Email
                </label>
              </div>
              <div class="input-container ic2">
                <input
                  type="password"
                  required
                  class="input"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                />
                <div class="cut cut-short"></div>
                <label for="email" class="placeholder">
                  Password
                </label>
              </div>
              <div class="input-container ic2">
                <input
                  type="password"
                  required
                  class="input"
                  value={this.state.confirm_password}
                  required
                  onChange={this.onChangeConfirmPassword}
                />
                <div class="cut cut-short"></div>
                <label for="email" class="placeholder">
                  Confirm Password
                </label>
              </div>
              <div className="radioButtons">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  required
                  onChange={this.onChangeFeMale}
                />
                <label for="male" style={{ color: "white" }}>
                  Male
                </label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={this.onChangeMale}
                />
                <label for="female" style={{ color: "white" }}>
                  Female
                </label>
              </div>
              <br />
              <div style={{ zIndex: "200" }}>
                <select
                  value={this.state.location}
                  onChange={this.onChangeLocation}
                  onClick={this.onChangeLocation}
                  style={{
                    width: "100%",
                    background: "#303245",
                    height: "40px",
                    bordeRadius: "12px",
                    border: 0,
                    boSizing: "border-box",
                    color: "#eee",
                    fontSize: "15px",
                    color: "grey",
                    borderWidth: "0",
                    marginTop: "20px",
                    alignItems: "center",
                    zIndex: "100",
                    width: "70%",
                  }}
                >
                  <option>Location </option>
                  <option value="Addis Ababa">Addis Ababa</option>
                  <option value="Adama">Adama</option>
                </select>
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
                  marginBottom: "100px",
                  outline: 0,
                  textAlign: "center",
                  width: "70%",
                }}
                disabled={UI.loading && true}
              >
                sign up
                {UI.loading && (
                  <CircularProgress
                    className={classes.progress}
                    size={25}
                  ></CircularProgress>
                )}
              </Button>
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
  userSignup,
};

export default connect(mapStateToProps, mapStateToDispatch)(signup);
