import React from "react";
import { Collapse, Navbar, Nav, NavItem, NavLink } from "reactstrap";

class AdminSubNav extends React.Component {
  render() {
    return (
      <Navbar color="faded" expand="xs">
        <Collapse isOpen={true} navbar style={{ color: "blue" }}>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/admin/map">Map</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default AdminSubNav;
