const initialState = {
  events: [],
  oneEvent: {},
};

const eventReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case "SETEVENTS":
      return {
        ...state,
        events: actions.events,
      };
    case "SETEVENT":
      return {
        ...state,
        oneEvent: actions.oneEvent,
      };
    default:
      return state;
  }
};

export default eventReducer;
