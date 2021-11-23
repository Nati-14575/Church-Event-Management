import React from "react";
import { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import classes from "./form.module.css";

class Editprofile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loginError: false,
      confirm_password: "",
      users: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/users/" + this.props.match.params.id)
      .then((result) => {
        this.setState({
          username: result.data.username,
        });
      });
  }

  onChangeUserName = (event) => {
    this.setState({
      username: event.target.value,
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

  onSubmit = (event) => {
    event.preventDefault();
    if (
      this.state.password.length >= 8 &&
      this.state.password === this.state.confirm_password
    ) {
      const user = {
        username: this.state.username,
        password: this.state.password,
      };

      axios
        .patch(
          "http://localhost:5000/api/users/add/" + this.props.match.params.id,
          user
        )
        .then((result) => console.log(result.data))
        .catch((err) => console.log(err));
      this.props.history.push("/");
    } else {
      this.setState({
        signupError: true,
      });
    }
    this.setState({
      username: "",
      password: "",
      confirm_password: "",
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className={classes.container}>
          <div className={classes.center}>
            <h1>Edit Profile</h1>
            {this.state.signupError && (
              <div className={classes.error}>
                <label>Incorrect Credentials</label>
              </div>
            )}
            <form onSubmit={this.onSubmit}>
              <div className={classes.txt_field}>
                <input
                  type="text"
                  required
                  value={this.state.username}
                  onChange={this.onChangeUserName}
                />
                <span></span>
                <label>Username: </label>
              </div>

              <div className={classes.txt_field}>
                <input
                  type="password"
                  required
                  value={this.state.password}
                  onChange={this.onChangePassword}
                />
                <span></span>
                <label>Password: </label>
              </div>

              <div className={classes.txt_field}>
                <input
                  type="password"
                  required
                  value={this.state.confirm_password}
                  onChange={this.onChangeConfirmPassword}
                />
                <span></span>
                <label>Confirm Password: </label>
              </div>
              <input
                type="submit"
                value="Save Profile"
                className={classes.submit}
              />
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    reducer: state.AR,
  };
};

const mapStateToDispatch = (dispatch) => {
  return {
    setAuthentication: () => dispatch({ type: "USER_LOGGEDIN" }),
    setRole: () => dispatch({ type: "ADMIN_ROLE" }),
    setUser: (user) => dispatch({ type: "SET_USER", user }),
  };
};

export default connect(
  mapStateToProps,
  mapStateToDispatch
)(withRouter(Editprofile));
