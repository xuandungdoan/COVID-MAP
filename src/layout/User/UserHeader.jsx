import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import logo from "../Image/Logo-text.png";

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <link
        href="https://kit-free.fontawesome.com/releases/latest/css/free.min.css"
        media="all"
        rel="stylesheet"
      ></link>

      <Navbar color="light" light expand="md">
        <Nav style={{ marginLeft: "10%", width: "100%" }}>
          {/*------------------  LOGO  --------- */}
          <NavbarBrand
            href="/"
            style={{ marginRight: "-40px", marginLeft: "-8%", zIndex: "3" }}
          >
            <img src={logo} alt="logo" style={{ width: "70%" }}></img>
          </NavbarBrand>
          {/*------------------  DROP BUTTON  --------- */}
          <NavbarToggler
            onClick={toggle}
            style={{
              fontSize: "0.7rem",
              outline: "none",
              border: "0px",
              zIndex: "3",
            }}
          />

          {/*------------------  Button log in  --------- */}
          <NavItem
            className="btn-login"
            style={{ position: "fixed", top: "15px", right: "9%" }}
          >
            <NavLink href="/login">
              Log in
              <i
                class="fas fa-sign-in-alt"
                style={{ fontsize: "1.2rem", transform: "translate(50%, 10%)" }}
              ></i>
            </NavLink>
          </NavItem>

          {/*------------------  NAVBAR-ITEM  --------- */}
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar style={{ zIndex: "2" }}>
              <NavItem>
                <NavLink href="/map">Map</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Nav>
      </Navbar>
    </div>
  );
};

export default Header;
