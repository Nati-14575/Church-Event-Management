import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styler from "./form.module.css";

import { forgetPass } from "../../../store/redux/actions/userActions";

const styles = (theme) => ({
  ...theme.spreadIt,
});

class forgotPassword extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
    };
  }
  handleSubmit = async (event) => {
    event.preventDefault();

    const { email } = this.state;
    this.props.forgetPass(email, this.props.history);
  };

  onChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  render() {
    const { classes, UI } = this.props;

    return (
      <React.Fragment>
        <div className={styler.container}>
          <div className={styler.center}>
            {UI.error && <div className={styler.error}>{UI.error.message}</div>}
            <form className={styler.form} onSubmit={this.handleSubmit}>
              <div className={styler.txt_field}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  className={classes.textField}
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                  required
                />
                <span></span>
                <label>Email: </label>
              </div>

              <div>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={styler.submit}
                  disabled={UI.loading && true}
                >
                  Reset
                  {UI.loading && (
                    <CircularProgress
                      className={classes.progress}
                      size={25}
                    ></CircularProgress>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

forgotPassword.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return { UI: state.UI };
};

const mapStateToDispatch = {
  forgetPass,
};

export default connect(
  mapStateToProps,
  mapStateToDispatch
)(withStyles(styles)(forgotPassword));
