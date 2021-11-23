import React from "react";
import { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { connect } from "react-redux";
import classes from "../Profile/form.module.css";

class createEvent extends Component {
  constructor(props) {
    super(props);

    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeEventName = this.onChangeEventName.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: this.props.reducer.currentUser.username,
      posterPhoto: "",
      eventname: "",
      location: "",
      description: "",
      duration: "",
      amount: "",
      date: new Date(),
    };
  }

  componentDidMount() {
    this.setState({
      username: this.props.reducer.currentUser.username,
      posterPhoto: this.props.reducer.currentUser.photo,
    });
  }

  onChangeUserName = (event) => {
    this.setState({
      username: event.target.value,
    });
  };
  onChangeEventName = (event) => {
    this.setState({
      eventname: event.target.value,
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

  onChangeLocation = (event) => {
    this.setState({
      location: event.target.value,
    });
  };

  onChangeAmount = (event) => {
    this.setState({
      amount: event.target.value,
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
      amount: this.state.amount,
      posterPhoto: this.state.posterPhoto,
      date: this.state.date,
    };

    axios
      .post("http://localhost:5000/api/events/add", event)
      .then((result) => console.log(result.data));
    window.location.reload();
  };

  render() {
    const onImageChange = (event) => {
      const image = event.target.files[0];
      const formData = new FormData();
      formData.append("image", image);
      axios.post("http://localhost:5000/api/events/addEventPhoto", formData);
    };
    return (
      <React.Fragment>
        <div className={classes.container}>
          <div className={classes.center}>
            <h1>Create Event</h1>
            <form onSubmit={this.onSubmit} encType="multipart/formdata">
              <div className={classes.txt_field}>
                <input type="text" required value={this.state.username} />
                <span></span>
                <label>Poster name: </label>
              </div>
              <div className={classes.txt_field}>
                <input
                  type="text"
                  required
                  value={this.state.eventname}
                  onChange={this.onChangeEventName}
                />
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
                <input
                  type="number"
                  required
                  value={this.state.amount}
                  onChange={this.onChangeAmount}
                />
                <span></span>
                <label>Amount of Seats(in number): </label>
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
              <div>
                <input type="file" name="image" onChange={onImageChange} />
              </div>
              <input
                type="submit"
                value="Create Event"
                className={classes.submit}
              />
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    reducer: state.AR,
  };
};

export default connect(mapStateToProps)(createEvent);
