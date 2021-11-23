import React, { Component, useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import classes from "./App.module.css";
import "./bootstrap/css/bootstrap.min.css";

// Component Import
import eventList from "./component/Pages/Event/eventList";
import editEvent from "./component/Pages/Event/editEvent";
import createEvent from "./component/Pages/Event/createEvent";
import signUp from "./component/Pages/Profile/signUp";
import login from "./component/Pages/Profile/login";
import editProfile from "./component/Pages/Profile/editProfile";
import anevent from "./component/Pages/Event/event";
import Sidedrawer from "./component/Toolbar/Sidedrawer/Sidedrawer";
import Toolbar from "./component/Toolbar/Toolbar";
import Backdrop from "./component/Backdrop/Backdrop";
import Footer from "./component/Footer/Footer";
import ResetPassword from "./component/Pages/Profile/resetPassword";
import forgotPassword from "./component/Pages/Profile/forgotPassword";
import verifyAccount from "./component/Pages/Profile/verifyAccount";
import myEvent from "./component/Pages/Event/myEvent";
import mayJoinEvent from "./component/Pages/Event/mayJoinEvent";
import joinedPeoples from "./component/Pages/peoples/joinedPeoples";
import mayJoinPeoples from "./component/Pages/peoples/mayJoinPeoples";
import { getEvents } from "./store/redux/actions/eventActions";
import { isLoggedIn } from "./store/redux/actions/userActions";

const drawerToggelClickHandler = (setSideDrawerOpen) => {
  setSideDrawerOpen(true);
};

const backDropClickHandler = (setSideDrawerOpen) => {
  setSideDrawerOpen(false);
};

function App(props) {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

  const { reducer } = props;

  let sideDrawer;
  let backDrop;

  if (sideDrawerOpen) {
    sideDrawer = <Sidedrawer currentUser={reducer.currentUser} />;
    backDrop = (
      <Backdrop
        backDropClickHandler={() => backDropClickHandler(setSideDrawerOpen)}
      />
    );
  }

  useEffect(() => {
    props.getEvents();
    props.isLoggedIn();
  }, []);
  return (
    <Router>
      <div className={classes.container}>
        <Toolbar
          onDrawerToggleCLicked={() =>
            drawerToggelClickHandler(setSideDrawerOpen)
          }
          backDropClickHandler={() => backDropClickHandler(setSideDrawerOpen)}
        />
        {reducer.isAuthenticated && (
          <>
            {sideDrawer}
            {backDrop}
          </>
        )}

        <Route exact path="/" exact component={eventList} />
        <Route exact path="/event/:id" exact component={anevent} />
        <Route exact path="/edit/:id" exact component={editEvent} />
        <Route exact path="/events" exact component={eventList} />
        <Route exact path="/create" exact component={createEvent} />
        <Route exact path="/user/signUp" exact component={signUp} />
        <Route exact path="/user/login" exact component={login} />
        <Route
          exact
          path="/user/editprofile/:id"
          exact
          component={editProfile}
        />
        <Route path="/users/verify" component={verifyAccount} />
        <Route exact path="/users/forgotpassword" component={forgotPassword} />
        <Route path="/users/resetpassword" component={ResetPassword} />
        <Route path="/joinedEvent" component={myEvent} />
        <Route path="/mayJoinEvent" component={mayJoinEvent} />
        <Route path="/joinedPeoples/:id" component={joinedPeoples} />
        <Route path="/mayJoinPeoples/:id" component={mayJoinPeoples} />
      </div>
      <Footer />
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    reducer: state.AR,
  };
};

export default connect(mapStateToProps, { isLoggedIn, getEvents })(App);
