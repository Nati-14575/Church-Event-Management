import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import classes from "./event.module.css";
import Pagination from "../../../component/Pagination";

class myEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      joinedEvents: [],

      posts: [],
      currentPage: 1,
      postsPerPage: 10,
    };
  }

  componentDidMount() {
    axios
      .get(
        "http://localhost:5000/api/events/myEvent/" +
          this.props.reducer.currentUser._id
      )
      .then((result) => {
        if (result.data.eventsJoined) {
          this.setState({
            joinedEvents: result.data.eventsJoined,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidUpdate() {
    axios
      .get(
        "http://localhost:5000/api/events/myEvent/" +
          this.props.reducer.currentUser._id
      )
      .then((result) => {
        if (result.data.eventsJoined) {
          this.setState({
            joinedEvents: result.data.eventsJoined,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;

    const currentPosts = this.state.joinedEvents.slice(
      indexOfFirstPost,
      indexOfLastPost
    );

    const paginate = (pageNumber) => {
      this.setState({
        currentPage: pageNumber,
      });
    };

    return (
      <React.Fragment>
        <div className={classes.bodyContainer}>
          <h3 className={classes.h3}>Events</h3>
          <div class="listItem">
            {currentPosts.map((event) => {
              return (
                <>
                  <>
                    <div class="event">
                      <div class="event-header">
                        <img
                          src={`http://localhost:5000/static/assets/events${event.image}`}
                          alt="rover"
                        />
                      </div>
                      <div class="event-body">
                        <span class="tag tag-teal">{event.eventname}</span>
                        <h4>{event.location}</h4>
                        <p>{event.description}</p>
                        <div class="user">
                          <Link to={"/event/" + event._id}>
                            <div class="tag tag-teal">View Details</div>
                          </Link>
                        </div>
                      </div>
                    </div>{" "}
                  </>
                </>
              );
            })}
          </div>
        </div>

        {this.state.joinedEvents.length > 0 && (
          <div>
            <Pagination
              postsPerPage={this.state.postsPerPage}
              totalPosts={this.state.joinedEvents.length}
              paginate={paginate}
            />
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    reducer: state.AR,
  };
};

export default connect(mapStateToProps)(myEvent);
