import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
export default class Header extends Component {
  render() {
    return (
      <Fragment>
        <div className="container-fluid p-0 m-0">
          <nav className="navbar navbar-dark navbar-expand-lg  bg-dark">
            <a className="navbar-brand" href="/">
              Covid Beehexa
            </a>
            <NavLink
              to="/map"
              className="nav-link"
              activeStyle={{
                background: "red",
                color: "white",
              }}
            >
              Map-page
            </NavLink>
          </nav>
        </div>
      </Fragment>
    );
  }
}
