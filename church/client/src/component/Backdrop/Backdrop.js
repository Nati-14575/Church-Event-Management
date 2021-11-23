import React, { Component } from "react";
import classes from "./Backdrop.module.css";

class backdrop extends Component {
  render() {
    return (
      <React.Fragment>
        <div
          className={classes.backdrop}
          onClick={this.props.backDropClickHandler}
        ></div>
      </React.Fragment>
    );
  }
}

export default backdrop;
