import React from "react";
import { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

import classes from "../Profile/form.module.css";

class editEventComponent extends Component {
  constructor(props) {
    super(props);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      eventname: "",
      location: "",
      description: "",
      duration: "",
      date: new Date(),
      users: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/events/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          username: response.data.username,
          eventname: response.data.eventname,
          location: response.data.location,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date),
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  onChangeEventName = (event) => {
    this.setState({
      eventname: event.target.value,
    });
  };

  onChangeLocation = (event) => {
    this.setState({
      location: event.target.value,
    });
  };

  onChangeDescription = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  onChangeDuration = (event) => {
    this.setState({
      duration: event.target.value,
    });
  };

  onChangeDate = (date) => {
    this.setState({
      date: date,
    });
  };

  onSubmit = (submit) => {
    submit.preventDefault();

    const event = {
      username: this.state.username,
      location: this.state.location,
      eventname: this.state.eventname,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };

    axios
      .patch(
        "http://localhost:5000/api/events/add/" + this.props.match.params.id,
        event
      )
      .then((result) => console.log(result.data));

    this.props.history.push("/");
  };

  render() {
    return (
      <React.Fragment>
        <div className={classes.container}>
          <div className={classes.center}>
            <h1>Edit Event</h1>
            <form onSubmit={this.onSubmit}>
              <div className={classes.txt_field}>
                <input type="text" required value={this.state.username} />
                <span></span>
                <label>Poster name: </label>
              </div>
              <div className={classes.txt_field}>
                <input type="text" required value={this.state.eventname} />
                <span></span>
                <label>Event name: </label>
              </div>
              <div className={classes.txt_field}>
                <input
                  type="text"
                  required
                  value={this.state.location}
                  onChange={this.onChangeLocation}
                />
                <span></span>
                <label>Location: </label>
              </div>
              <div className={classes.txt_field}>
                <textarea
                  type="text"
                  required
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                />
                <span></span>
                <label>Description: </label>
              </div>
              <div className={classes.txt_field}>
                <input
                  type="text"
                  required
                  value={this.state.duration}
                  onChange={this.onChangeDuration}
                />
                <span></span>
                <label>Duration(in hours): </label>
              </div>
              <div className={classes.txt_field}>
                <div>
                  <DatePicker
                    selected={this.state.date}
                    onChange={this.onChangeDate}
                  />
                  <span></span>
                </div>
              </div>
              <input
                type="submit"
                value="Edit Event"
                className={classes.submit}
              />
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default editEventComponent;
