const initialState = {
  isAuthenticated: false,
  adminrole: false,
  currentUser: {},
  commentPoster: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOGGEDOUT": {
      return {
        ...state,
        isAuthenticated: false,
      };
    }
    case "USER_LOGGEDIN":
      return {
        ...state,
        isAuthenticated: true,
      };
    case "SET_USER":
      return {
        ...state,
        currentUser: { ...state.currentUser, ...action.user },
      };
    case "REMOVE_USER": {
      return {
        ...state,
        currentUser: {},
      };
    }
    case "ADMIN_ROLE":
      return {
        ...state,
        adminrole: true,
      };
    case "USER_ROLE":
      return {
        ...state,
        adminrole: false,
      };
    case "USER_COMMENT":
      return {
        ...state,
        commentPoster: { ...state.commentPoster, ...action.commentor },
      };
    default: {
    }
  }

  return state;
};

export default reducer;
