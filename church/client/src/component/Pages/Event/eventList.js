import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import classes from "./event.module.css";
import { connect } from "react-redux";
import "./eventList.css";
import Pagination from "../../../component/Pagination";

class editEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      posts: [],
      currentPage: 1,
      postsPerPage: 10,
    };
  }

  componentWillMount() {
    this.setState({
      events: this.props.ER.events,
    });
  }

  render() {
    const { ER } = this.props;
    const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    const currentPosts = this.state.events.slice(
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
        <div className={classes.bodyContainer}>
          <h3 className={classes.h3}>Events</h3>
          {this.state.events.length > 0 ? (
            <div class="listItem">
              {currentPosts.map((event) => {
                return (
                  <div class="event">
                    <div class="event-header">
                      <img
                        src={
                          require(`../../../assets/events/${event.image}`)
                            .default
                        }
                        // src={`http://localhost:5000/static/assets/events/${event.image}`}
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
                  </div>
                );
              })}
            </div>
          ) : (
            <div class="noEvent">
              <label>There are no events currently posted</label>
            </div>
          )}
        </div>

        {this.state.events.length > 0 && (
          <Pagination
            postsPerPage={this.state.postsPerPage}
            totalPosts={this.state.events.length}
            paginate={paginate}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { ER: state.ER };
};

export default connect(mapStateToProps)(editEvent);
