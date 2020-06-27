import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logOutRequest } from "../../store/actions/logout.action";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import logo from "../../assets/images/Logo.png";

class Header extends React.Component {
  state = {
    isOpen: false,
    isLoggedIn: this.props.isLogin,
  };
  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  toggleLoggedIn = () => {
    this.setState({ isLoggedIn: !this.state.isLoggedIn });
  };
  componentDidMount = () => {};
  logoutHandle = (event) => {
    event.preventDefault();
    // Remove the user object from the Redux store
    this.props.logOutRequest(localStorage.getItem("token"));

    // Remove the token from localStorage
    //localStorage.removeItem("token")
  };

  renderLoggedInMenu = () => {
    return (
      <Nav className="" navbar>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            <FontAwesomeIcon
              icon={faUserCircle}
              style={{ margin: "0px 10px" }}
            />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem tag={Link} to="/admin/dashboard">
              Admin
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={this.logoutHandle}>Logout</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    );
  };
  renderAnnonymousMenu = () => {
    return (
      <Nav className="" navbar>
        <NavItem className="btn-login">
          <NavLink onClick={this.toggleLoggedIn} tag={Link} to="/login">
            Log in
            <FontAwesomeIcon
              icon={faSignInAlt}
              style={{ margin: "0px 10px" }}
            />
          </NavLink>
        </NavItem>
      </Nav>
    );
  };
  render() {
    // var token = localStorage.getItem('token');

    // if(!token){
    //   if(history.location.pathname !== '/login'){
    //     this.setState({ isLoggedIn: true });
    //   }
    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">
          <img src={logo} alt="logo" style={{ width: "50px" }}></img>
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/map">Map</NavLink>
            </NavItem>
          </Nav>
          {this.props.isLogin && this.renderLoggedInMenu()}
          {!this.props.isLogin && this.renderAnnonymousMenu()}
        </Collapse>
      </Navbar>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logOutRequest: (token) => dispatch(logOutRequest(token)),
  };
};

export default connect(null, mapDispatchToProps)(Header);
