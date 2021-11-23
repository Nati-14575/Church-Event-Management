import axios from "axios";
import Cookies from "universal-cookie";

import {
  USER_LOGGEDIN,
  SET_USER,
  LOADING_UI,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING,
} from "../types";

const cookies = new Cookies();

export const userLogin = (userData, history) => (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
  dispatch({
    type: LOADING_UI,
  });
  cookies.set("useremail", userData.email, { path: "/" });
  cookies.set("userpassword", userData.password, { path: "/" });
  axios
    .post("http://localhost:5000/api/users/login", {
      email: userData.email,
      password: userData.password,
    })
    .then((res) => {
      console.log(res.data.data);
      dispatch({
        type: LOADING_UI,
      });
      dispatch({
        type: "SET_USER",
        user: res.data.data,
      });
      dispatch({
        type: USER_LOGGEDIN,
      });
      cookies.set("user", res.data.data, { path: "/" });
      if (res.data.data.role === "admin") {
        dispatch({
          type: "ADMIN_ROLE",
        });
      }
      history.push("/");
    })
    .catch((err) => {
      dispatch({
        type: LOADING_UI,
      });
      dispatch({
        type: "SET_ERRORS",
        error: err.response.data.message,
      });
      setTimeout(() => {
        dispatch({
          type: CLEAR_ERRORS,
        });
      }, 2500);
    });
};

export const verifyAccount = (token, history) => (dispatch) => {
  axios
    .post(`http://localhost:5000/api/users/verify/${token}`)
    .then((res) => {
      dispatch({
        type: USER_LOGGEDIN,
      });
      dispatch({
        type: SET_USER,
        user: res.data.data,
      });
      history.push("/");
    })
    .catch((err) => {
      history.push("/signup");
    });
};

export const userSignup = (userData, history) => (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
  dispatch({
    type: LOADING_UI,
  });

  axios
    .post("http://localhost:5000/api/users/add", {
      email: userData.email,
      username: userData.username,
      password: userData.password,
      confirmPassword: userData.confirm_password,
      location: userData.location,
      gender: userData.gender,
    })
    .then((res) => {
      dispatch({
        type: "LOADING_UI",
      });
      history.push("/users/verify");
    })
    .catch((err) => {
      dispatch({
        type: "SET_ERRORS",
        error: err.response.data.message,
      });
      setTimeout(() => {
        dispatch({
          type: "CLEAR_ERRORS",
        });
      }, 2500);
      dispatch({
        type: "LOADING_UI",
      });
    });
};

export const userLogout = (history) => (dispatch) => {
  dispatch({ type: "USER_LOGGEDOUT" });
  dispatch({ type: "REMOVE_USER" });
  dispatch({ type: "USER_ROLE" });
  cookies.set("user", {}, { path: "/" });
};

export const editUser = (userDetails) => (dispatch) => {
  dispatch({
    type: LOADING,
  });

  axios
    .patch("http://localhost:5000/api/users/", userDetails)
    .then((res) => {
      dispatch({
        type: SET_USER,
        user: userDetails,
      });
    })
    .catch((err) => {
      dispatch({
        type: LOADING,
      });
    });
};

export const forgetPass = (email, history) => (dispatch) => {
  dispatch({
    type: LOADING_UI,
  });

  axios
    .post("http://localhost:5000/api/users/forgot-password", {
      email,
    })
    .then((res) => {
      dispatch({
        type: LOADING_UI,
      });
      history.push("http://localhost:5000/api/users/resetpassword");
    })
    .catch((err) => {
      dispatch({
        type: LOADING_UI,
      });
      dispatch({
        type: SET_ERRORS,
        error: err.response.data,
      });
      setTimeout(() => {
        dispatch({
          type: CLEAR_ERRORS,
        });
      }, 2500);
    });
};

export const resetPass = (token, newPass, history) => (dispatch) => {
  dispatch({
    type: LOADING_UI,
  });
  axios
    .patch(`http://localhost:5000/api/users/reset-password/${token}`, newPass)
    .then((res) => {
      dispatch({
        type: USER_LOGGEDIN,
      });
      dispatch({
        type: LOADING_UI,
      });
      dispatch({
        type: SET_USER,
        user: res.data.data,
      });
      if (res.data.data.role === "admin") {
        dispatch({
          type: "ADMIN_ROLE",
        });
      }
      setTimeout(() => {
        history.push("/");
      }, 500);
    })
    .catch((err) => {
      dispatch({
        type: LOADING_UI,
      });
      dispatch({
        type: SET_ERRORS,
        error: err.response.data,
      });
      setTimeout(() => {
        dispatch({
          type: CLEAR_ERRORS,
        });
        history.push("/login");
      }, 5000);
    });
};

export const isLoggedIn = () => (dispatch) => {
  let loggedUser = cookies.get("user");
  let email = cookies.get("useremail");
  let password = cookies.get("userpassword");
  axios
    .post("http://localhost:5000/api/users/login", {
      email: email,
      password: password,
    })
    .then((res) => {
      dispatch({
        type: "SET_USER",
        user: res.data.data,
      });
      dispatch({
        type: USER_LOGGEDIN,
      });
      cookies.set("user", res.data.data, { path: "/" });
      if (res.data.data.role === "admin") {
        dispatch({
          type: "ADMIN_ROLE",
        });
      }
    });
};
