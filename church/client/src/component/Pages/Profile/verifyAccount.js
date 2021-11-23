import React from "react";
import { connect } from "react-redux";

import withStyles from "@material-ui/core/styles/withStyles";

import { verifyAccount } from "../../../store/redux/actions/userActions";

const styles = (theme) => ({
  ...theme.spreadIt,
  resetForm: {
    maxWidth: "300px",
  },
});

const textStyle = {
  display: "inline",
  color: "#800080",
  marginLeft: "10px",
  fontSize: 36,
  textAlign: "center",
};

function VerifyAccount({ resetPass, classes, UI, history, verifyAccount }) {
  let token;
  const noToken =
    window.location.pathname.endsWith("verify") ||
    window.location.pathname.endsWith("verify/");

  if (!noToken) {
    const splittedPathname = window.location.pathname.split("/");
    token = splittedPathname[splittedPathname.length - 1];
  }

  !noToken && verifyAccount(token, history);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "150px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "500px",
        }}
      >
        {!noToken ? (
          <h1 style={textStyle}>wait a few seconds. verifying...</h1>
        ) : (
          <h1 id="notFound" style={textStyle}>
            An email has been successfully sent to your account. Follow the
            instructions to verify your account
          </h1>
        )}
      </div>
    </div>
  );
}

export default connect(null, { verifyAccount })(
  withStyles(styles)(VerifyAccount)
);
