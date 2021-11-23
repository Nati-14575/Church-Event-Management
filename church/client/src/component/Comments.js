import React from "react";
import classes from "./Comment.module.css";
import { connect } from "react-redux";
import axios from "axios";

function Comments({ username, comment, currentUser }) {
  return (
    <React.Fragment>
      <div className={classes.comments}>
        <div className={classes.username}>{username}</div>
        <div className={classes.comment}>{comment}</div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    reducer: state.AR,
  };
};

export default connect(mapStateToProps)(Comments);
