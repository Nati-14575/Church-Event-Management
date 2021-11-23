import React, { Component } from "react";
import classes from "./Drawertoggle.module.css";
class drawertoggle extends Component {
  render() {
    return (
      <div>
        <button
          className={classes.toggle_button}
          onClick={this.props.onDrawerToggleCLicked}
        >
          <div className={classes.toggle_button_line} />
          <div className={classes.toggle_button_line} />
          <div className={classes.toggle_button_line} />
        </button>
      </div>
    );
  }
}

export default drawertoggle;
