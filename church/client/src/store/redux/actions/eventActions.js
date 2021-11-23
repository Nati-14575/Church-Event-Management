import axios from "axios";

export const getEvents = () => (dispatch) => {
  axios.get("http://localhost:5000/api/events/").then((result) => {
    dispatch({
      type: "SETEVENTS",
      events: result.data,
    });
  });
};

const getEvent = (eventId) => (dispatch) => {
  axios.get("http://localhost:5000/api/events/" + eventId).then((result) => {});
};
