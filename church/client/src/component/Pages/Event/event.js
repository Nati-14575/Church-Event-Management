import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import classes from "./oneEvent.module.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Pagination from "../../../component/Pagination";
import Comments from "../../Comments";

class event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: null,
      e_id: "",
      availableSeats: "",
      comments: [],
      comment: "",
      username: "",
      loginCorrect: true,
      commentPosted: false,
      currentPage: 1,
      postsPerPage: 10,
    };
    this.deleteEvent = this.deleteEvent.bind(this);
    this.joinEvent = this.joinEvent.bind(this);
  }

  componentDidMount() {
    this.setState({
      username: this.props.reducer.currentUser.username,
    });

    axios
      .get("http://localhost:5000/api/events/" + this.props.match.params.id)
      .then((result) => {
        console.log(result.data);
        this.setState({
          event: result.data.event,
          e_id: result.data.event._id,
          availableSeats: result.data.availableSeats,
        });
      });

    axios
      .get("http://localhost:5000/api/comments/" + this.props.match.params.id)
      .then((result) => {
        this.setState({
          comments: result.data,
        });
      });
  }

  componentDidUpdate() {
    axios
      .get("http://localhost:5000/api/comments/" + this.props.match.params.id)
      .then((result) => {
        this.setState({
          comments: result.data,
        });
      });
  }

  onChangeComment = (event) => {
    this.setState({
      comment: event.target.value,
    });
  };

  deleteEvent = (id) => {
    axios
      .delete("http://localhost:5000/api/events/" + id)
      .then((result) => console.log(result.data));
    this.props.history.push("/");
  };
  joinEvent = () => {
    axios
      .post(
        "http://localhost:5000/api/events/joinEvent/" +
          this.props.match.params.id,
        {
          userId: this.props.reducer.currentUser._id,
        }
      )
      .then(window.alert("Event joined"));
    this.props.history.push("/");
  };
  mayjoinEvent = () => {
    axios
      .post(
        "http://localhost:5000/api/events/mayjoinEvent/" +
          this.props.match.params.id,
        {
          userId: this.props.reducer.currentUser._id,
        }
      )
      .then(window.alert("Event joined"));
    this.props.history.push("/");
  };
  onSubmit = (event) => {
    event.preventDefault();

    if (this.props.reducer.isAuthenticated) {
      const newComment = {
        event_id: this.state.event._id,
        username: this.state.username,
        comment: this.state.comment,
      };

      axios
        .post("http://localhost:5000/api/comments/add", newComment)
        .then((result) => {
          this.setState({ commentPosted: true });
          setTimeout(() => this.setState({ commentPosted: false }), 2000);
        });

      this.setState({ comment: "" });
    } else {
      this.setState({ loginCorrect: false });
      setTimeout(() => this.setState({ loginCorrect: true }), 2000);
    }
  };

  render() {
    const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    const currentPosts = this.state.comments.slice(
      indexOfFirstPost,
      indexOfLastPost
    );

    const paginate = (pageNumber) => {
      this.setState({
        currentPage: pageNumber,
      });
    };

    return (
      <>
        <div className={classes.container}>
          {this.state.event && (
            <>
              <div className={classes.eventContainer}>
                <div className={classes.eventOptions}>
                  {this.props.reducer.isAuthenticated && (
                    <>
                      {this.state.event.username ===
                        this.props.reducer.currentUser.username && (
                        <>
                          <div className={classes.option}>
                            <Link to={"/edit/" + this.state.event._id}>
                              Edit
                            </Link>
                          </div>
                          <div className={classes.option}>
                            <a
                              href="/"
                              onClick={() => {
                                this.deleteEvent(this.state.event._id);
                              }}
                            >
                              Delete
                            </a>
                          </div>

                          <>
                            <div className={classes.option}>
                              <Link
                                to={"/joinedPeoples/" + this.state.event._id}
                              >
                                <label>Joined Peoples</label>
                              </Link>
                            </div>
                            <div className={classes.option}>
                              <Link
                                to={"/mayJoinPeoples/" + this.state.event._id}
                              >
                                <label>Peoples Who May Join</label>
                              </Link>
                            </div>
                          </>
                        </>
                      )}
                      {this.props.reducer.currentUser.events.length > 0 && (
                        <>
                          {this.props.reducer.currentUser.events.map(
                            (myEvent) => {
                              return (
                                <>
                                  {myEvent._id !== this.state.event._id && (
                                    <>
                                      <div
                                        style={{
                                          marginRight: "auto",
                                          height: "50px",
                                        }}
                                      >
                                        <Button
                                          variant="contained"
                                          style={{
                                            backgroundColor: "#383b3d",
                                            padding: "10px",
                                            color: "#fff",
                                            fontWeight: "bolder",
                                          }}
                                          onClick={this.joinEvent}
                                        >
                                          Join Event
                                        </Button>
                                        <Button
                                          variant="contained"
                                          style={{
                                            backgroundColor: "#383b3d",
                                            padding: "10px",
                                            color: "#fff",
                                            fontWeight: "bolder",
                                          }}
                                          onClick={this.mayJoinEvent}
                                        >
                                          May Join
                                        </Button>
                                      </div>
                                    </>
                                  )}
                                </>
                              );
                            }
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
                <div className={classes.eventDetailsContainer}>
                  <div className={classes.eventImage}>
                    <img
                      src={
                        require(`../../../assets/events/${this.state.event.image}`)
                          .default
                      }
                    />
                  </div>
                  <div className={classes.detail}>
                    <div style={{ display: "flex" }}>
                      <div className={classes.leftSide}>Poster Name:</div>
                      <div className={classes.rightSide}>
                        {this.state.event.username}
                      </div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div className={classes.leftSide}>Event Name: </div>
                      <div className={classes.rightSide}>
                        {this.state.event.eventname}
                      </div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div className={classes.leftSide}>Location: </div>
                      <div className={classes.rightSide}>
                        {this.state.event.location}
                      </div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div className={classes.leftSide}>Description: </div>
                      <div className={classes.rightSide}>
                        {this.state.event.description}
                      </div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div className={classes.leftSide}>Duration: </div>
                      <div className={classes.rightSide}>
                        {this.state.event.duration}
                      </div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div className={classes.leftSide}>
                        Total amount of seats:
                      </div>
                      <div className={classes.rightSide}>
                        {this.state.event.amount}
                      </div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div className={classes.leftSide}>Avaliable Seats: </div>
                      <div className={classes.rightSide}>
                        {this.state.availableSeats}
                      </div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div className={classes.leftSide}>Date: </div>
                      <div className={classes.rightSide}>
                        {new Date(this.state.event.date).toLocaleDateString(
                          "en-us"
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={classes.comment}>
                  <div className={classes.commentSection}>
                    {!this.state.loginCorrect && (
                      <div className={classes.error}>
                        <label>Please log in to your account</label>
                      </div>
                    )}
                    {this.state.commentPosted && (
                      <div className={classes.success}>
                        <label>Comment posted</label>
                      </div>
                    )}
                    <TextField
                      required
                      onChange={this.onChangeComment}
                      label="comment"
                      placeholder="write a comment"
                      variant="outlined"
                      multiline
                      rows={4}
                      className={classes.text_field}
                    />
                    <span></span>
                    <center>
                      <Button
                        onClick={this.onSubmit}
                        variant="contained"
                        color="primary"
                        className={classes.postButton}
                      >
                        Comment
                      </Button>
                    </center>
                  </div>
                  <div className={classes.commentShower}>
                    <h3>Comments</h3>
                    {this.state.comments.length > 0 ? (
                      currentPosts.map((post) => {
                        return (
                          <Comments
                            username={post.username}
                            comment={post.comment}
                            currentUser={
                              this.props.reducer.currentUser.username
                            }
                          />
                        );
                      })
                    ) : (
                      <div className={classes.noComment}>
                        <label>No Comment</label>
                      </div>
                    )}
                    {this.state.comments.length > 0 && (
                      <div>
                        <Pagination
                          postsPerPage={this.state.postsPerPage}
                          totalPosts={this.state.comments.length}
                          paginate={paginate}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    reducer: state.AR,
  };
};

export default connect(mapStateToProps)(event);
