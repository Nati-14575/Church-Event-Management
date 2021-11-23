import React, { useState } from "react";
import { connect } from "react-redux";

import { resetPass } from "../../../store/redux/actions/userActions";
import styler from "./form.module.css";

const textStyle = {
  display: "inline",
  color: "#800080",
  marginLeft: "10px",
  fontSize: 36,
  textAlign: "center",
};

function ResetPassword({ resetPass, history }) {
  const [inputFields, setInputFields] = useState({
    password: "",
    confirmPassword: "",
  });
  const [resetErrors, setError] = useState({
    resetError: false,
  });

  let token;
  const noToken =
    window.location.pathname.endsWith("resetpassword") ||
    window.location.pathname.endsWith("resetpassword/");

  if (!noToken) {
    const splittedPathname = window.location.pathname.split("/");
    token = splittedPathname[splittedPathname.length - 1];
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputFields.password === inputFields.confirmPassword) {
      resetPass(token, inputFields, history);
    } else {
      setTimeout(() => {
        setError({
          resetError: true,
        });
      }, 2000);
    }
  };

  const handleChange = (event) => {
    setInputFields({
      ...inputFields,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <React.Fragment>
      <div className={styler.container}>
        <div className={styler.center}>
          {!noToken ? (
            <>
              {resetErrors.resetError && (
                <div className={styler.error}>passwords did not match</div>
              )}
              <form onSubmit={handleSubmit}>
                <div className={styler.txt_field}>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="New password"
                    className={styler.textField}
                    value={inputFields.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styler.txt_field}>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    className={styler.textField}
                    value={inputFields.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <input
                    type="submit"
                    value="Reset"
                    className={styler.submit}
                  />
                </div>
              </form>
            </>
          ) : (
            <h1 id="notFound" style={textStyle}>
              An email has been successfully sent to your account. Follow the
              instructions to reset your password
            </h1>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return { UI: state.UI };
};

export default connect(mapStateToProps, { resetPass })(ResetPassword);
