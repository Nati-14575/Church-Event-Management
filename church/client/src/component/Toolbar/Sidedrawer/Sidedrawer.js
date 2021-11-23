import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import Tooltip from "@material-ui/core/Tooltip";
import { userLogout } from "../../../store/redux/actions/userActions";
import classes from "./Sidedrawer.module.css";
import axios from "axios";

class sidedrawer extends Component {
  constructor(props) {
    super(props);
  }
  setOff = () => {
    this.props.userLogout();
    this.props.history.push("/");
  };

  render() {
    const handleImageEdit = () => {
      const input = document.getElementById("imageInput");
      input.click();
    };

    return (
      <>
        <nav className={classes.side_drawer}>
          <div className={classes.UL}>
            <div className={classes.profileAvatar}>
              <img
                src={
                  require(`../../../assets/images/${this.props.currentUser.photo}`)
                    .default
                }
              />
              <input
                type="file"
                id="imageInput"
                name="photo"
                hidden="hidden"
                onChange={(event) => {
                  const image = event.target.files[0];
                  const formData = new FormData();

                  formData.append("file", image);

                  axios.post(
                    "http://localhost:5000/api/users/uploadImage",
                    formData
                  );
                  window.location.reload();
                }}
              />
              <Tooltip title="change profile picture" placement="top">
                <IconButton
                  onClick={handleImageEdit}
                  className={classes.editIcon}
                >
                  <AddAPhotoIcon color="primary" fontSize="large" />
                </IconButton>
              </Tooltip>
            </div>
            <div className={classes.profile}>
              <label className={classes.details}>
                {this.props.currentUser.username}
              </label>
              <label className={classes.details}>
                {this.props.currentUser.email}
              </label>
            </div>
            <div className={classes.options}>
              {this.props.reducer.isAuthenticated && (
                <>
                  {this.props.reducer.currentUser.eventsJoined.length > 0 && (
                    <>
                      <div className={classes.LI}>
                        <Link
                          to="/joinedEvent"
                          className={classes.side_drawer_link}
                        >
                          Joined Events
                        </Link>
                      </div>
                    </>
                  )}
                  {this.props.reducer.currentUser.eventsMayJoin.length > 0 && (
                    <>
                      <div className={classes.LI}>
                        <Link
                          to="/mayJoinEvent"
                          className={classes.side_drawer_link}
                        >
                          May join Events
                        </Link>
                      </div>
                    </>
                  )}
                  <div className={classes.LI}>
                    <Link
                      to={
                        "user/editprofile/" + this.props.reducer.currentUser._id
                      }
                      className={classes.side_drawer_link}
                    >
                      Edit Profile
                    </Link>
                  </div>
                  <div className={classes.LI}>
                    <Link
                      onClick={this.setOff}
                      className={classes.side_drawer_link}
                    >
                      Log out
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </nav>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    reducer: state.AR,
  };
};

export default connect(mapStateToProps, { userLogout })(withRouter(sidedrawer));
